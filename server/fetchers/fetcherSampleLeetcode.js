import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { chromium } from "playwright-extra";
import stealth from "puppeteer-extra-plugin-stealth";

const LEETCODE_USERNAME = process.env.LEETCODE_USERNAME || null;
const LEETCODE_SESSION_COOKIE = process.env.LEETCODE_SESSION_COOKIE || null;
const MAX_SUBMISSIONS = 10; // Hard limit on number of submissions to fetch

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple direct fetch method without browser overhead
export async function fetchSubmissionsSimple() {
    try {
        console.log('Trying simple GraphQL approach...');
        console.log('Username:', LEETCODE_USERNAME);
        console.log('Has session cookie:', !!LEETCODE_SESSION_COOKIE);
        
        const response = await fetch("https://leetcode.com/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cookie": `LEETCODE_SESSION=${LEETCODE_SESSION_COOKIE}`,
                "referer": "https://leetcode.com/",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            },
            body: JSON.stringify({
                query: `query recentSubmissions($username: String!) { 
                    recentSubmissionList(username: $username) { 
                        title
                        titleSlug
                        statusDisplay
                        lang
                        timestamp
                        url
                        runtime
                        memory
                    } 
                }`,
                variables: { username: LEETCODE_USERNAME }
            })
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
            const errorText = await response.text();
            console.log('Error response body:', errorText);
            throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
        }

        const data = await response.json();
        console.log('GraphQL response:', JSON.stringify(data, null, 2));
        
        if (data.errors) {
            console.log('GraphQL errors:', data.errors);
            throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
        }

        const submissions = data.data?.recentSubmissionList || [];
        console.log(`Found ${submissions.length} submissions`);
        return submissions.slice(0, MAX_SUBMISSIONS);
    } catch (error) {
        console.error('Simple GraphQL method failed:', error.message);
        return null;
    }
}

// Alternative GraphQL query for public profile data
export async function fetchPublicSubmissions() {
    try {
        console.log('Trying public profile GraphQL approach...');
        
        const response = await fetch("https://leetcode.com/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "referer": "https://leetcode.com/",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
            },
            body: JSON.stringify({
                query: `query userProfile($username: String!) {
                    matchedUser(username: $username) {
                        username
                        profile {
                            realName
                        }
                        submitStatsGlobal {
                            acSubmissionNum {
                                difficulty
                                count
                            }
                        }
                    }
                    recentSubmissionList(username: $username) {
                        title
                        titleSlug
                        statusDisplay
                        lang
                        timestamp
                    }
                }`,
                variables: { username: LEETCODE_USERNAME }
            })
        });

        const data = await response.json();
        console.log('Public GraphQL response:', JSON.stringify(data, null, 2));
        
        if (data.errors) {
            console.log('Public GraphQL errors:', data.errors);
            return null;
        }

        const submissions = data.data?.recentSubmissionList || [];
        return submissions.slice(0, MAX_SUBMISSIONS);
    } catch (error) {
        console.error('Public GraphQL method failed:', error.message);
        return null;
    }
}

// Browser-based approach with better error handling
export async function fetchWithBrowser() {
    let browser = null;
    
    try {
        console.log('Starting browser-based fetch...');
        
        browser = await chromium.use(stealth()).launch({
            headless: false, // Set to true for production, false for debugging
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-blink-features=AutomationControlled']
        });
        
        const context = await browser.newContext({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        });
        
        const page = await context.newPage();
        
        // Set session cookie if provided
        if (LEETCODE_SESSION_COOKIE) {
            await context.addCookies([{
                name: 'LEETCODE_SESSION',
                value: LEETCODE_SESSION_COOKIE,
                domain: '.leetcode.com',
                path: '/'
            }]);
        }
        
        console.log('Navigating to LeetCode...');
        await page.goto('https://leetcode.com', { waitUntil: 'networkidle', timeout: 30000 });
        
        // Wait a bit for the page to fully load
        await page.waitForTimeout(3000);
        
        console.log('Trying GraphQL in browser context...');
        const submissions = await page.evaluate(async (params) => {
            try {
                const response = await fetch("https://leetcode.com/graphql", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-csrftoken": document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                        "referer": window.location.href
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        query: `query recentSubmissions($username: String!) { 
                            recentSubmissionList(username: $username) { 
                                title
                                titleSlug
                                statusDisplay
                                lang
                                timestamp
                                url
                                runtime
                                memory
                            } 
                        }`,
                        variables: { username: params.username }
                    })
                });
                
                const data = await response.json();
                console.log('Browser GraphQL response:', data);
                
                if (data.errors) {
                    throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
                }
                
                return data.data?.recentSubmissionList || [];
            } catch (error) {
                console.error('Browser GraphQL error:', error);
                return null;
            }
        }, { username: LEETCODE_USERNAME });
        
        if (submissions && submissions.length > 0) {
            return submissions.slice(0, MAX_SUBMISSIONS);
        }
        
        // Try profile page scraping as fallback
        console.log('GraphQL failed, trying profile page...');
        return await scrapeProfilePage(page);
        
    } catch (error) {
        console.error('Browser method failed:', error);
        return null;
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

async function scrapeProfilePage(page) {
    try {
        console.log(`Navigating to profile: https://leetcode.com/${LEETCODE_USERNAME}/`);
        await page.goto(`https://leetcode.com/${LEETCODE_USERNAME}/`, { 
            waitUntil: 'networkidle',
            timeout: 30000 
        });
        
        // Take a screenshot for debugging
        await page.screenshot({ path: 'leetcode-profile.png', fullPage: true });
        console.log('Profile page screenshot saved as leetcode-profile.png');
        
        // Wait for page content
        await page.waitForTimeout(5000);
        
        // Get page title and URL to verify we're on the right page
        const title = await page.title();
        const url = page.url();
        console.log('Page title:', title);
        console.log('Page URL:', url);
        
        // Check if we're redirected to login
        if (url.includes('/accounts/login/') || title.includes('Login')) {
            console.log('Redirected to login page - authentication required');
            return null;
        }
        
        // Try to find any submission-related content
        const pageContent = await page.evaluate(() => {
            // Get all text content to see what's available
            const body = document.body.innerText;
            
            // Look for specific patterns
            const hasSubmissions = body.toLowerCase().includes('submission');
            const hasProblems = body.toLowerCase().includes('problem');
            const hasAccepted = body.toLowerCase().includes('accepted');
            
            return {
                bodyLength: body.length,
                hasSubmissions,
                hasProblems,
                hasAccepted,
                bodyPreview: body.substring(0, 500)
            };
        });
        
        console.log('Page analysis:', pageContent);
        
        // Try different approaches to find submissions
        const submissions = await page.evaluate((maxSubmissions) => {
            const results = [];
            
            // Method 1: Look for table rows with submission data
            const tableRows = document.querySelectorAll('tbody tr, .submission-row, [data-cy*="submission"]');
            console.log('Found table rows:', tableRows.length);
            
            for (let i = 0; i < Math.min(tableRows.length, maxSubmissions); i++) {
                const row = tableRows[i];
                const submission = {};
                
                // Look for problem links
                const problemLink = row.querySelector('a[href*="/problems/"]');
                if (problemLink) {
                    submission.title = problemLink.textContent?.trim();
                    submission.titleSlug = problemLink.href?.split('/problems/')[1]?.split('/')[0];
                    submission.url = problemLink.href;
                }
                
                // Look for status indicators
                const statusElements = row.querySelectorAll('span, div');
                for (const el of statusElements) {
                    const text = el.textContent?.trim().toLowerCase();
                    if (text?.includes('accepted') || text?.includes('wrong') || text?.includes('error')) {
                        submission.statusDisplay = el.textContent?.trim();
                        break;
                    }
                }
                
                if (submission.title) {
                    results.push(submission);
                }
            }
            
            // Method 2: Look for any links to problems
            if (results.length === 0) {
                const problemLinks = document.querySelectorAll('a[href*="/problems/"]');
                console.log('Found problem links:', problemLinks.length);
                
                for (let i = 0; i < Math.min(problemLinks.length, maxSubmissions); i++) {
                    const link = problemLinks[i];
                    results.push({
                        title: link.textContent?.trim(),
                        titleSlug: link.href?.split('/problems/')[1]?.split('/')[0],
                        url: link.href,
                        statusDisplay: 'Unknown',
                        timestamp: new Date().toISOString()
                    });
                }
            }
            
            return results;
        }, MAX_SUBMISSIONS);
        
        console.log('Scraped submissions:', submissions);
        return submissions;
        
    } catch (error) {
        console.error('Profile scraping failed:', error);
        return null;
    }
}

// Try REST API approach
export async function fetchViaAPI() {
    try {
        console.log('Trying REST API approach...');
        
        const apiUrl = `https://leetcode.com/api/submissions/?offset=0&limit=${MAX_SUBMISSIONS}&lastkey=`;
        
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Cookie': `LEETCODE_SESSION=${LEETCODE_SESSION_COOKIE}`,
                'referer': 'https://leetcode.com/',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });
        
        console.log('API Response status:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.log('API Error response:', errorText);
            return null;
        }
        
        const data = await response.json();
        console.log('API Response:', data);
        
        return data.submissions_dump || data.submissions || [];
    } catch (error) {
        console.error('API method failed:', error);
        return null;
    }
}

// Main function with comprehensive error logging
export async function fetchSampleData() {
    console.log('='.repeat(50));
    console.log(`Starting LeetCode scraper for user: ${LEETCODE_USERNAME}`);
    console.log(`Target submissions: ${MAX_SUBMISSIONS}`);
    console.log(`Has session cookie: ${!!LEETCODE_SESSION_COOKIE}`);
    console.log('='.repeat(50));
    
    if (!LEETCODE_USERNAME) {
        throw new Error('LEETCODE_USERNAME environment variable is required');
    }
    
    const methods = [
        { name: 'Simple GraphQL', func: fetchSubmissionsSimple },
        { name: 'Public GraphQL', func: fetchPublicSubmissions },
        { name: 'Browser-based', func: fetchWithBrowser },
        { name: 'REST API', func: fetchViaAPI }
    ];
    
    for (const method of methods) {
        try {
            console.log(`\n--- Trying ${method.name} ---`);
            const submissions = await method.func();
            
            if (submissions && submissions.length > 0) {
                console.log(`✅ ${method.name} succeeded!`);
                console.log(`Found ${submissions.length} submissions`);
                
                // Save to file
                const outputPath = path.join(__dirname, 'submissions.json');
                fs.writeFileSync(outputPath, JSON.stringify(submissions, null, 2));
                console.log(`Submissions saved to: ${outputPath}`);
                
                return submissions;
            } else {
                console.log(`❌ ${method.name} returned no results`);
            }
        } catch (error) {
            console.log(`❌ ${method.name} failed:`, error.message);
        }
    }
    
    console.log('\n' + '='.repeat(50));
    console.log('All methods failed. Possible issues:');
    console.log('1. Invalid or expired session cookie');
    console.log('2. Username might not exist or be private');
    console.log('3. LeetCode API changes or rate limiting');
    console.log('4. Network connectivity issues');
    console.log('='.repeat(50));
    
    throw new Error('All scraping methods failed - check logs above');
}

// Export the main function for backwards compatibility
export default fetchSampleData;
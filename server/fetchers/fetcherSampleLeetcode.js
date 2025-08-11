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

export async function fetchSubmissions() {
    let browser = null;
    
    try {
        // Launch browser with stealth plugin
        browser = await chromium.use(stealth()).launch({
            headless: true, // Set to false for debugging
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        
        // Set session cookie if provided
        if (LEETCODE_SESSION_COOKIE) {
            await page.context().addCookies([{
                name: 'LEETCODE_SESSION',
                value: LEETCODE_SESSION_COOKIE,
                domain: '.leetcode.com',
                path: '/'
            }]);
        }
        
        // Navigate to LeetCode
        await page.goto('https://leetcode.com', { waitUntil: 'networkidle' });
        
        // Method 1: Try GraphQL approach with browser context
        const submissions = await fetchViaGraphQL(page);
        
        if (submissions && submissions.length > 0) {
            console.log(`Successfully fetched ${submissions.length} submissions via GraphQL`);
            return submissions.slice(0, MAX_SUBMISSIONS);
        }
        
        // Method 2: Fallback to profile page scraping
        console.log('GraphQL failed, trying profile page scraping...');
        const profileSubmissions = await fetchViaProfileScraping(page);
        
        if (profileSubmissions && profileSubmissions.length > 0) {
            console.log(`Successfully fetched ${profileSubmissions.length} submissions via profile scraping`);
            return profileSubmissions.slice(0, MAX_SUBMISSIONS);
        }
        
        throw new Error('Both GraphQL and profile scraping methods failed');
        
    } catch (error) {
        console.error('Error fetching submissions:', error);
        throw error;
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

async function fetchViaGraphQL(page) {
    try {
        const response = await page.evaluate(async (username, maxSubmissions) => {
            try {
                const res = await fetch("https://leetcode.com/graphql", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-csrftoken": document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                        "referer": "https://leetcode.com/"
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        query: `query recentSubmissions($username: String!, $limit: Int!) { 
                            recentSubmissionList(username: $username, limit: $limit) { 
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
                        variables: { 
                            username: username,
                            limit: maxSubmissions
                        }
                    })
                });
                
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                
                const data = await res.json();
                
                if (data.errors) {
                    throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
                }
                
                return data.data?.recentSubmissionList || [];
            } catch (error) {
                console.error('GraphQL fetch error:', error);
                return null;
            }
        }, LEETCODE_USERNAME, MAX_SUBMISSIONS);
        
        return response;
    } catch (error) {
        console.error('GraphQL method failed:', error);
        return null;
    }
}

async function fetchViaProfileScraping(page) {
    if (!LEETCODE_USERNAME) {
        throw new Error('LEETCODE_USERNAME is required for profile scraping');
    }
    
    try {
        // Navigate to user profile
        await page.goto(`https://leetcode.com/${LEETCODE_USERNAME}/`, { 
            waitUntil: 'networkidle',
            timeout: 30000 
        });
        
        // Wait for profile to load
        await page.waitForSelector('[data-layout="base-layout"]', { timeout: 10000 });
        
        // Try to find and click on submissions or recent activity
        try {
            // Look for submissions tab or recent submissions section
            const submissionsTab = await page.locator('text=Submissions').first();
            if (await submissionsTab.isVisible()) {
                await submissionsTab.click();
                await page.waitForTimeout(2000);
            }
        } catch (e) {
            console.log('Could not find submissions tab, continuing...');
        }
        
        // Extract submission data from the page
        const submissions = await page.evaluate((maxSubmissions) => {
            const submissionElements = [];
            
            // Try different selectors for submission data
            const selectors = [
                '[data-testid*="submission"]',
                '.submission-item',
                '[class*="submission"]',
                '.recent-submission',
                'tbody tr' // Table rows
            ];
            
            for (const selector of selectors) {
                const elements = document.querySelectorAll(selector);
                if (elements.length > 0) {
                    submissionElements.push(...Array.from(elements));
                    break;
                }
            }
            
            const results = [];
            
            for (let i = 0; i < Math.min(submissionElements.length, maxSubmissions); i++) {
                const element = submissionElements[i];
                const submission = {};
                
                // Extract problem title
                const titleElement = element.querySelector('a[href*="/problems/"]') || 
                                   element.querySelector('[data-testid*="title"]') ||
                                   element.querySelector('.problem-title');
                if (titleElement) {
                    submission.title = titleElement.textContent?.trim();
                    submission.url = titleElement.href;
                    submission.titleSlug = titleElement.href?.split('/problems/')[1]?.split('/')[0];
                }
                
                // Extract status
                const statusElement = element.querySelector('[class*="status"]') ||
                                    element.querySelector('[data-testid*="status"]') ||
                                    element.querySelector('.text-green') ||
                                    element.querySelector('.text-red');
                if (statusElement) {
                    submission.statusDisplay = statusElement.textContent?.trim();
                }
                
                // Extract language
                const langElement = element.querySelector('[class*="lang"]') ||
                                  element.querySelector('[data-testid*="lang"]');
                if (langElement) {
                    submission.lang = langElement.textContent?.trim();
                }
                
                // Extract timestamp
                const timeElement = element.querySelector('time') ||
                                  element.querySelector('[class*="time"]') ||
                                  element.querySelector('[data-testid*="time"]');
                if (timeElement) {
                    submission.timestamp = timeElement.getAttribute('datetime') || 
                                         timeElement.textContent?.trim();
                }
                
                // Only add if we got at least a title
                if (submission.title) {
                    results.push(submission);
                }
            }
            
            return results;
        }, MAX_SUBMISSIONS);
        
        return submissions;
    } catch (error) {
        console.error('Profile scraping failed:', error);
        return null;
    }
}

// Alternative method using the submissions API endpoint directly
export async function fetchSubmissionsAPI() {
    let browser = null;
    
    try {
        browser = await chromium.use(stealth()).launch({ headless: true });
        const page = await browser.newPage();
        
        // Set session cookie
        if (LEETCODE_SESSION_COOKIE) {
            await page.context().addCookies([{
                name: 'LEETCODE_SESSION',
                value: LEETCODE_SESSION_COOKIE,
                domain: '.leetcode.com',
                path: '/'
            }]);
        }
        
        await page.goto('https://leetcode.com', { waitUntil: 'networkidle' });
        
        // Try the submissions API endpoint
        const submissions = await page.evaluate(async (username, maxSubmissions) => {
            try {
                const res = await fetch(`https://leetcode.com/api/submissions/?offset=0&limit=${maxSubmissions}&lastkey=`, {
                    method: 'GET',
                    headers: {
                        'referer': 'https://leetcode.com/',
                        'x-requested-with': 'XMLHttpRequest'
                    },
                    credentials: 'include'
                });
                
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                
                const data = await res.json();
                return data.submissions_dump || [];
            } catch (error) {
                console.error('API fetch error:', error);
                return null;
            }
        }, LEETCODE_USERNAME, MAX_SUBMISSIONS);
        
        return submissions;
    } catch (error) {
        console.error('API method failed:', error);
        return null;
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

// Main function that tries all methods
export async function fetchSampleData() {
    console.log(`Attempting to fetch ${MAX_SUBMISSIONS} recent submissions for user: ${LEETCODE_USERNAME}`);
    
    if (!LEETCODE_USERNAME) {
        throw new Error('LEETCODE_USERNAME environment variable is required');
    }
    
    try {
        // Try the main method first
        let submissions = await fetchSubmissions();
        
        if (!submissions || submissions.length === 0) {
            console.log('Main method failed, trying API endpoint...');
            submissions = await fetchSubmissionsAPI();
        }
        
        if (submissions && submissions.length > 0) {
            console.log('Successfully fetched submissions:', submissions);
            
            // Optionally save to file
            const outputPath = path.join(__dirname, 'submissions.json');
            fs.writeFileSync(outputPath, JSON.stringify(submissions, null, 2));
            console.log(`Submissions saved to: ${outputPath}`);
            
            return submissions;
        } else {
            throw new Error('No submissions found with any method');
        }
    } catch (error) {
        console.error('All methods failed:', error);
        throw error;
    }
}

// Export the main function for backwards compatibility
export default fetchSampleData;
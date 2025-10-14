import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import Hero from "./components/sections/Hero/Hero";
import IdentitySection from "./components/sections/IdentitySection/IdentitySection";
import LocationSection from "./components/sections/LocationSection/LocationSection";
import ProjectsSection from "./components/sections/ProjectsSection/ProjectsSection";
import TechStackSection from "./components/sections/TechStackSection/TechStackSection";
import Footer from "./components/Footer/Footer";
import DataCampSection from "./components/sections/DataCampSection/DataCampSection";
import ContactSection from "./components/sections/ContactSection/ContactSection";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const cronStartedRef = useRef(false);

  useEffect(() => {
    // Minimum loading time of 3 seconds
    const minLoadingTime = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        setShowContent(true);
      }
    }, 3000);

    return () => clearTimeout(minLoadingTime);
  }, [isLoading]);

  useEffect(() => {
    // Start the server keep-alive system after loading
    if (showContent && !cronStartedRef.current) {
      cronStartedRef.current = true;

      const pingServer = async (retryCount = 0) => {
        const routes = [
          "/api/recent-projects",
          "/api/recent-commits",
          "/api/leetcode-submissions",
          "/api/datacamp-projects",
          "/api/datacamp-courses",
          "/" // Health check endpoint
        ];

        const randomRoute = routes[Math.floor(Math.random() * routes.length)];
        const url = `${import.meta.env.VITE_SERVER_URL}${randomRoute}`;

        try {
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache'
            }
          });

          if (response.ok) {
            console.log(`✅ Server ping successful: ${randomRoute} at ${new Date().toISOString()}`);
            retryCount = 0; // Reset retry count on success
          } else {
            throw new Error(`Server responded with status: ${response.status}`);
          }
        } catch (error) {
          console.error(`❌ Server ping failed (attempt ${retryCount + 1}):`, error.message);

          // Retry logic with exponential backoff
          if (retryCount < 3) {
            const retryDelay = Math.min(1000 * Math.pow(2, retryCount), 30000); // Max 30 seconds
            console.log(`🔄 Retrying in ${retryDelay}ms...`);
            setTimeout(() => pingServer(retryCount + 1), retryDelay);
            return;
          } else {
            console.error(`💀 Max retries reached. Server might be down.`);
          }
        }
      };

      const scheduleNextPing = () => {
        // More frequent pings: 2-4 minutes instead of 3-5
        const randomDelay = Math.random() * (240000 - 120000) + 120000; // 2-4 minutes in ms
        setTimeout(() => {
          pingServer();
          scheduleNextPing(); // Schedule next ping
        }, randomDelay);
      };

      // Initial ping
      pingServer();
      // Schedule recurring pings
      scheduleNextPing();
    }
  }, [showContent]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setShowContent(true);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className={`app-container ${showContent ? "fade-in" : ""}`}>
      <Hero />
      <IdentitySection />
      <LocationSection />
      <TechStackSection />
      <ProjectsSection />
      <DataCampSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;

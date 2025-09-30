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
    // Start the cron job after loading
    if (showContent && !cronStartedRef.current) {
      cronStartedRef.current = true;

      const pingServer = async () => {
        const routes = [
          "/api/recent-projects",
          "/api/recent-commits",
          "/api/leetcode-submissions",
          "/api/datacamp-projects",
          "/api/datacamp-courses",
        ];

        const randomRoute = routes[Math.floor(Math.random() * routes.length)];
        const url = `${import.meta.env.VITE_SERVER_URL}${randomRoute}`;

        try {
          await fetch(url);
          console.log(`Pinged ${randomRoute} at ${new Date().toISOString()}`);
        } catch (error) {
          console.error("Ping failed:", error);
        }
      };

      const scheduleNextPing = () => {
        const randomDelay = Math.random() * (300000 - 180000) + 180000; // 3-5 minutes in ms
        setTimeout(() => {
          pingServer();
          scheduleNextPing(); // Schedule next ping
        }, randomDelay);
      };

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

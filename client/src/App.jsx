import React, { useState, useEffect } from "react";
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

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setShowContent(true);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className={`app-container ${showContent ? 'fade-in' : ''}`}>
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

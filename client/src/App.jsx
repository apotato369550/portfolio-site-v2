import "./App.css";
import Hero from "./components/sections/Hero/Hero";
import IdentitySection from "./components/sections/IdentitySection/IdentitySection";
import LocationSection from "./components/sections/LocationSection/LocationSection";
import ProjectsSection from "./components/sections/ProjectsSection/ProjectsSection";
import TechStackSection from "./components/sections/TechStackSection/TechStackSection";
import Footer from "./components/Footer/Footer";
import DataCampSection from "./components/sections/DataCampSection/DataCampSection";
import ContactSection from "./components/sections/ContactSection/ContactSection";

function App() {
  return (
    <>
      <Hero />
      <IdentitySection />
      <LocationSection />
      <TechStackSection />
      <ProjectsSection />
      <DataCampSection />
      <ContactSection style={{ minHeight: 'auto' }} />
      <Footer />
    </>
  );
}

export default App;

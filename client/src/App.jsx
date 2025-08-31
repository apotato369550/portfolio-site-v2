import "./App.css";
import Hero from "./components/sections/Hero/Hero";
import IdentitySection from "./components/sections/IdentitySection/IdentitySection";
import LocationSection from "./components/sections/LocationSection/LocationSection";
import ProjectsSection from "./components/sections/ProjectsSection/ProjectsSection";
import TechStackSection from "./components/sections/TechStackSection/TechStackSection";

function App() {
  return (
    <>
      <Hero />
      <IdentitySection />
      <LocationSection />
      <TechStackSection />
      <ProjectsSection />
    </>
  );
}

export default App;

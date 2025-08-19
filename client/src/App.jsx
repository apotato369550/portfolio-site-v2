import "./App.css";
import Hero from "./components/sections/Hero/Hero";
import IdentitySection from "./components/sections/IdentitySection/IdentitySection";
import LocationSection from "./components/sections/LocationSection/LocationSection";
import TechStackSection from "./components/sections/TechStackSection/TechStackSection";

function App() {
  return (
    <>
      <Hero />
      <IdentitySection />
      <LocationSection />
      <TechStackSection />
      <div className="scroll-instruction-bottom text-center text-white text-sm lg:text-base py-8 bg-gradient-to-r from-purple-900 to-blue-900">
        Scroll or Click The Navbar to Get Started!
      </div>
    </>
  );
}

export default App;

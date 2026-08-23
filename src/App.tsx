import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import { Overview, Challenge, Solution } from "./components/Story";
import Timeline from "./components/Timeline";
import AIContent from "./components/AIContent";
import AILayer from "./components/AILayer";
import Assistant from "./components/Assistant";
import TechStack from "./components/TechStack";
import Gallery from "./components/Gallery";
import { Result, About, Footer } from "./components/Closing";
import Shop from "./shop/Shop";

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const fn = () => {
      setHash(window.location.hash);
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", fn);
    return () => window.removeEventListener("hashchange", fn);
  }, []);
  return hash;
}

function CaseStudy() {
  return (
    <div className="relative min-h-screen bg-ink-950 text-zinc-300">
      <div className="grain" aria-hidden />
      <Nav />
      <main>
        <Hero />
        <Overview />
        <Challenge />
        <Solution />
        <Timeline />
        <AIContent />
        <AILayer />
        <Assistant />
        <TechStack />
        <Gallery />
        <Result />
        <About />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  const hash = useHashRoute();
  if (hash.startsWith("#/shop")) return <Shop />;
  return <CaseStudy />;
}

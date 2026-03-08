import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Achievements from "@/components/Achievements";
import Projects from "@/components/Projects";
import TechSpecs from "@/components/TechSpecs";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const Index = () => {
  return (
    <div id="top" className="min-h-screen bg-background">
      <CustomCursor />
      <Navbar />
      <header>
        <Hero />
      </header>
      <main>
        <section id="achievements">
          <Achievements />
        </section>
        <section id="specs">
          <TechSpecs />
        </section>
        <Projects />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

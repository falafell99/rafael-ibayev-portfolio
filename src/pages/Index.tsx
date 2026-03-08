import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Achievements from "@/components/Achievements";
import Projects from "@/components/Projects";
import TechSpecs from "@/components/TechSpecs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div id="top" className="min-h-screen bg-background">
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
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

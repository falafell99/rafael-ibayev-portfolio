import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Achievements from "@/components/Achievements";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import TechSpecs from "@/components/TechSpecs";
import Timeline from "@/components/Timeline";
import CurrentlyLearning from "@/components/CurrentlyLearning";
import GitHubActivity from "@/components/GitHubActivity";
import Languages from "@/components/Languages";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import GridPulseBackground from "@/components/GridPulseBackground";

const Index = () => {
  return (
    <div id="top" className="min-h-screen bg-background">
      <GridPulseBackground />
      <CustomCursor />
      <Navbar />
      <header>
        <Hero />
      </header>
      <main>
        <Stats />
        <section id="achievements">
          <Achievements />
        </section>
        <Projects />
        <section id="skills">
          <Skills />
        </section>
        <section id="specs">
          <TechSpecs />
        </section>
        <Timeline />
        <GitHubActivity />
        <Languages />
        <CurrentlyLearning />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

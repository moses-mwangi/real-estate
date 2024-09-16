import Contact from "./components/contact/Contact";
import HeroSection from "./components/heroSection/HeroSection";
import Propeties from "./components/properties/Propeties";
import AboutUs from "./components/service/AboutUs";
import OurTeam from "./components/team/OurTeam";
import Testimonials from "./components/testimoniaal/Testimonials";

export default function Home() {
  return (
    <main className="w-svw">
      <HeroSection />
      <Propeties />
      <Testimonials />
      <AboutUs />
      <OurTeam />
      <Contact />
    </main>
  );
}

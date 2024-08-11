import Contact from "./components/contact/Contact";
import Footer from "./footer/Footer";
import HeroSection from "./components/heroSection/HeroSection";
import Navbar from "./navbar/Navbar";
import Propeties from "./components/properties/Propeties";
import AboutUs from "./components/service/AboutUs";
import OurTeam from "./components/team/OurTeam";
import Testimonials from "./components/testimoniaal/Testimonials";

export default function Home() {
  return (
    <main className="">
      <HeroSection />
      <Propeties />
      <Testimonials />
      <AboutUs />
      <OurTeam />
      <Contact />
    </main>
  );
}

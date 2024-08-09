import HeroSection from "./heroSection/HeroSection";
import Navbar from "./navbar/Navbar";
import Propeties from "./properties/Propeties";
import AboutUs from "./service/AboutUs";
import OurTeam from "./team/OurTeam";
import Testimonials from "./testimoniaal/Testimonials";

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <HeroSection />
      <Propeties />
      <Testimonials />
      <AboutUs />
      <OurTeam />
    </main>
  );
}

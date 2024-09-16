"use client";

import Image from "next/image";
import Contact from "./components/contact/Contact";
import HeroSection from "./components/heroSection/HeroSection";
import Propeties from "./components/properties/Propeties";
import AboutUs from "./components/service/AboutUs";
import OurTeam from "./components/team/OurTeam";
import Testimonials from "./components/testimoniaal/Testimonials";

import logo from "../public/logos/image copy 11.png";
import { useEffect, useState } from "react";

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Set a timeout to display the rest of the content after 3 seconds
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 3000); // 3 seconds delay

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="">
      {!showContent && (
        <div className="flex bg-card flex-col items-center justify-center h-screen bg-gray-50">
          <div className="text-center">
            <Image
              src={logo}
              alt="Company Logo"
              width={300}
              height={350}
              className="w-52 h-40 mx-auto mb-4"
            />
            <h1 className="text-4xl font-bold">BOMAC Luxury Estate Company</h1>
            <p className="text-lg text-gray-600">Find Your Dream Property</p>
          </div>
        </div>
      )}
      {showContent && (
        <>
          <HeroSection />
          <Propeties />
          <Testimonials />
          <AboutUs />
          <OurTeam />
          <Contact />
        </>
      )}
    </main>
  );
}

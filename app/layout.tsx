import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Footer from "./components/footer/Footer";
import Navbar from "./navbar/Navbar";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--Poppins",
});

export const metadata: Metadata = {
  title: "Bomac Real Estate",
  description: "The best real estate company",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Link to the favicon */}
        {/* <link rel="icon" href="/favicon.ico" type="image/x-icon" /> */}
        {/* You can also use other image formats like PNG */}
        <link rel="icon" href="/logos/image copy 11.png" type="image/png" />
      </head>
      <body
        className={`${cn(poppins.variable)}`}
        style={{ fontFamily: "var(--Poppins)" }}
      >
        <div>
          <Toaster
            position="top-center"
            containerClassName=""
            toastOptions={{
              duration: 3000,
              className: "",
              style: {
                background: "#f1f5f9",
                color: "#111827",
                fontSize: "15px",
              },
            }}
          />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

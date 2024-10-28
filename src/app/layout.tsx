import type { Metadata } from "next";
import "./globals.css";
import NavigationBar from "@/app/components/shared/NavigationBar";
import LinkContainer from "@/app/components/shared/LinkContainer";
import Footer from "@/app/components/shared/Footer";

export const metadata: Metadata = {
  title: "Bella & Pepper Korean online store",
  description: "Authentic Korean Beverages & Cuisine – Indulge in the Rich Flavors of Korea with Our Selection of Traditional Drinks, Savory Dishes, and Sweet Treats. From Refreshing Korean Teas to Classic Delicacies, Experience a Taste of Korea in Every Sip and Bite!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="wireframe">
      <body>
        <NavigationBar />
        <LinkContainer />
          {children}
        <Footer />
        <link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.13/dist/full.min.css" rel="stylesheet" type="text/css" />
      </body>
    </html>
  );
}

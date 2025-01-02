import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import Footer from "@/app/components/shared/Footer";
import SessionProvider from "@/app/provider/SessionProvider";
import NavigationBar from "@/app/components/shared/NavigationBar";
import LinkContainer from "@/app/components/shared/LinkContainer";
import { ReduxProvider } from "@/redux/provider";

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
    <html lang="en" data-theme="forest">
      <body>
        <SessionProvider>
          <ReduxProvider>
            <Toaster />
            <NavigationBar />
            <LinkContainer />
            {children}
            <Footer />
          </ReduxProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

import Image from "next/image";
import React from "react";
import logo from "@/app/assets/logo.png";
import Link from "next/link";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";
export default function Footer() {
  return (
    <div className="w-full bg-slate-200" >
      <div className="w-full xl:w-9/12 m-auto">
        <footer className="footer p-10 text-slate-700">
          <nav>
            <h6 className="footer-title">Navigation</h6>
            <Link href={"/"} className="link link-hover">
              Home
            </Link>
            <Link href={"/product"} className="link link-hover">
              Product
            </Link>
            <Link href={"#about"} className="link link-hover">
              About Us
            </Link>
          </nav>
        
          <nav>
            <h6 className="footer-title">Legal</h6>
            <Link href={"#"} className="link link-hover">
              Terms of use
            </Link>
            <Link href={"#"} className="link link-hover">
              Privacy policy
            </Link>
          </nav>
        </footer>
        <footer className="footer bg-slate-200 text-base-content border-t px-10 py-4">
          <aside className="grid-flow-col items-center">
            <Image
              src={logo}
              alt="logo"
              width={50}
              height={50}
              loading="lazy"
            />
            <p className="font-medium">
              Bella and <span className="text-green-500">Pepper’s</span>
              <br />
              <span className="text-slate-500">Providing quality korean food and beverages</span>
            </p>
          </aside>
          <nav className="md:place-self-center md:justify-self-end">
            <div className="grid grid-flow-col gap-2">
              <Link href={"#"}>
                <TwitterIcon className="text-green-600 hover:text-green-600"/>
              </Link>
              <Link href={"#"}>
                <FacebookIcon className="text-green-600 hover:text-green-600"/>
              </Link>
              <Link href={"#"}>
                <InstagramIcon className="text-green-600 hover:text-green-600"/>
              </Link>
            </div>
          </nav>
        </footer>
      </div>
    </div>
  );
}

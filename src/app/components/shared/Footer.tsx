import Image from "next/image";
import React from "react";
import logo from "@/app/assets/logo.png";
import Link from "next/link";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";
export default function Footer() {
  return (
    <div className="w-full bg-base-200">
      <div className="w-full xl:w-9/12 m-auto">
        <footer className="footer text-base-content p-10">
          <nav>
            <h6 className="footer-title">Navigation</h6>
            <Link href={"#"} className="link link-hover">
              Home
            </Link>
            <Link href={"#"} className="link link-hover">
              Product
            </Link>
            <Link href={"#"} className="link link-hover">
              Category
            </Link>
          </nav>
          <nav>
            <h6 className="footer-title">Information</h6>
            <Link href={"#"} className="link link-hover">
              About us
            </Link>
            <Link href={"#"} className="link link-hover">
              Contact
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
        <footer className="footer bg-base-200 text-base-content border-base-300 border-t px-10 py-4">
          <aside className="grid-flow-col items-center">
            <Image
              src={logo}
              alt="logo"
              width={50}
              height={50}
              loading="lazy"
            />
            <p>
              ACME Industries Ltd.
              <br />
              Providing reliable food and beverages
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

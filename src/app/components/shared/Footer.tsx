import Image from "next/image";
import React from "react";
import logo from "@/app/assets/logo.png";
import Link from "next/link";
export default function Footer() {
  return (
    <div className="w-full bg-base-200">
      <div className="w-full xl:w-9/12 m-auto">
        <footer className="footer text-base-content p-10">
          <aside>
            <Image src={logo} alt="logo" width={100} height={100} loading="lazy"/>
            <p className="font-semibold">
              Bella & <span className="text-green-600">Pepper</span>
              <br />
              Providing reliable tech since 1992
            </p>
          </aside>
          <nav>
            <h6 className="footer-title">Navigation</h6>
            <Link href={"#"} className="link link-hover">Home</Link>
            <Link href={"#"} className="link link-hover">Product</Link>
            <Link href={"#"} className="link link-hover">Category</Link>
            <Link href={"#"} className="link link-hover">About Us</Link>
            <Link href={"#"} className="link link-hover">Contact Us</Link>
          </nav>
          <nav>
            <h6 className="footer-title">Social</h6>
            <Link href={"#"} className="link link-hover">Facebook</Link>
            <Link href={"#"} className="link link-hover">Instagram</Link>
            <Link href={"#"} className="link link-hover">Twitter</Link>
          </nav>
          <nav>
            <h6 className="footer-title">Legal</h6>
            <Link href={"#"} className="link link-hover">Terms of use</Link>
            <Link href={"#"} className="link link-hover">Privacy policy</Link>
          </nav>
        </footer>
      </div>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import UserAction from "./UserAction";
import logo from "@/app/assets/logo.png";
import SearchContainer from "./SearchContainer";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function NavigationBar() {

  return (
    <div className="flex flex-col">
      <nav className="w-11/12 xl:w-9/12 m-auto flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Menu
                size={21}
                className="text-slate-500 cursor-pointer hover:text-slate-700 block md:hidden"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-slate-300 shadow-lg ml-5 block md:hidden">
              <DropdownMenuItem className="text-slate-700" >
                <Link href={"/"}>Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-slate-700" >
                <Link href={"/product"}>Product</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-slate-700" >
                <Link href={"/#about"}>About Us</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-slate-700" >
                <Link href={"/login"}>Login</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-slate-700" >
                <Link href={"/register"}>Register</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Logo Section */}
          <div className="hidden md:block">
            <Link href={"/"} className="flex items-center gap-2 cursor-pointer">
              <Image
                src={logo}
                alt="Logo"
                className="w-auto h-auto object-contain"
                width={40}
                height={40}
                loading="lazy"
              />
              <h2 className="font-semibold text-slate-700 hidden md:block">
                Bella & <span className="text-green-600">Pepper</span>
              </h2>
            </Link>
          </div>

        </div>
        {/* Search Container */}
        <SearchContainer />
        {/* Icon Section */}
        <div className="flex items-center gap-2">
          <UserAction />
        </div>
      </nav>
    </div>
  );
}

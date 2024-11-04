"use client";
import Image from "next/image";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Bell,
  KeyRound,
  LogOut,
  Menu,
  Search,
  ShoppingBag,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

import logo from "@/app/assets/logo.png";
import CartSidebar from "@/app/components/shared/CartSidebar";
import { Separator } from "@/components/ui/separator";

export default function NavigationBar() {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);
  const pathname = usePathname();
  const searchProduct = () => {
    if (search !== "") {
      setSearch("");
      return router.push(`/search/${search}`);
    }
  };
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
                alt="Picture of the author"
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
        {/* Search Section */}
        <div className="hidden md:block w-5/12">
          <div className="flex items-center gap-2 w-full">
            <Input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              required
            />
            <Button
              onClick={searchProduct}
              className="bg-green-500 hover:bg-green-600"
            >
              Search
            </Button>
          </div>
        </div>
        {/* Icon Section */}
        <div className="flex items-center gap-2">
          {!pathname.startsWith("/search") ? (
            <Search
              onClick={() => setToggle(!toggle)}
              size={21}
              className="text-slate-500 cursor-pointer hover:text-slate-700 block md:hidden"
            />
          ) : null}

          {/*This is the drop down menu */}
          {false ? (
            <div className="hidden md:block">
              <div className="flex items-center gap-2">
                <Link href={"/login"} className="text-slate-500 text-sm hover:text-green-500 hover:underline">Login</Link>
                <Separator className="h-5" orientation={"vertical"} />
                <Link href={"/register"} className="text-slate-500 text-sm hover:text-green-500 hover:underline">Register</Link>
              </div>
            </div>
          ) :
            <div className="flex items-center gap-4">
              <Bell
                size={21}
                className="text-slate-500 cursor-pointer hover:text-slate-700 "
              />
              {/* Sheet Section */}
              <CartSidebar />
              {/* User Section Button */}
              <DropdownMenu>
                {/*This is the drop down button */}
                <DropdownMenuTrigger className="outline-none" asChild>
                  <Avatar className="w-8 h-8 cursor-pointer hover:opacity-90">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                {/*This is the drop down content */}
                <DropdownMenuContent className="w-56 border-none shadow-md mt-5 mr-5">
                  <DropdownMenuLabel className="text-slate-700">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4 text-slate-700" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ShoppingBag className="mr-2 h-4 w-4 text-slate-700" />
                    <span>My Cart</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <KeyRound className="mr-2 h-4 w-4 text-slate-700" />
                    <span>Change Password</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4 text-slate-700" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>}
        </div>
      </nav>
      {/* Search toggle section */}
      {toggle && !pathname.startsWith("/search") ? (
        <div className="w-11/12 xl:w-9/12 m-auto block md:hidden py-4">
          <div className="flex items-center gap-2 w-full">
            <Input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              required
            />
            <Button
              onClick={searchProduct}
              className="bg-green-500 hover:bg-green-600"
            >
              Search
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

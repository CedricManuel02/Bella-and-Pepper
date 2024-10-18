"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Bell,
  KeyRound,
  LogOut,
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
export default function NavigationBar() {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const searchProduct = () => {
    if (search !== "") return router.push(`/product/${search}`);
  };
  return (
    <nav className="w-11/12 xl:w-9/12 m-auto flex items-center justify-between py-4">
      {/* Logo Section */}
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
      <div className="flex items-center gap-4">
        <Search
          size={20}
          className="text-slate-500 cursor-pointer hover:text-slate-700 block md:hidden"
        />
        <Bell
          size={20}
          className="text-slate-500 cursor-pointer hover:text-slate-700 "
        />
        {/*This is the drop down menu */}
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
      </div>
    </nav>
  );
}

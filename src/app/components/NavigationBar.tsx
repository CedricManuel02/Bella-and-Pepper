"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heart, KeyRound, LogOut, ShoppingBag, User } from "lucide-react";
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
    if (search !== "") return router.push(`/product?query=${search}`);
  };
  return (
    <nav className="w-9/12 m-auto flex items-center justify-between py-6">
      {/* Logo Section */}
      <Link href={"/"} className="flex items-center gap-2 cursor-pointer">
        <Image src={logo} alt="Picture of the author" width={40} height={40} loading="lazy"/>
        <h2 className="font-semibold text-slate-700">
          Bella & <span className="text-green-600">Pepper</span>
        </h2>
      </Link>
      {/* Search Section */}
      <div className="flex items-center gap-2 w-4/12">
        <Input
          type="text"
          placeholder="Search..."
          value={`${search}`}
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
      {/* Icon Section */}
      <div className="flex items-center gap-4">
        <Heart
          size={20}
          className="text-slate-500 cursor-pointer hover:text-slate-700"
        />
        <ShoppingBag
          size={20}
          className="text-slate-500 cursor-pointer hover:text-slate-700"
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
          <DropdownMenuContent className="w-56 my-2 mr-44">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <KeyRound className="mr-2 h-4 w-4" />
              <span>Change Password</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

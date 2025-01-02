"use client";
import React from "react"
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Separator } from "@/components/ui/separator";
import CartSidebar from "@/app/components/shared/CartSidebar";
import { Bell, KeyRound, LogOut, ShoppingBag, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function UserAction() {
    const { data: session } = useSession();
    return (
        <div>
            {/*This is the drop down menu */}
            {session === null && (
                <div className="hidden md:block">
                    <div className="flex items-center gap-2">
                        <Link href={"/login"} className="text-slate-500 text-sm hover:text-green-500 hover:underline">Login</Link>
                        <Separator className="h-5" orientation={"vertical"} />
                        <Link href={"/register"} className="text-slate-500 text-sm hover:text-green-500 hover:underline">Register</Link>
                    </div>
                </div>
            )} 
            {session && session.user !== undefined && (
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
                            {session && (
                                <Avatar className="w-8 h-8 cursor-pointer hover:opacity-90">
                                    <AvatarImage src={session.user.image !== null ? `${session?.user?.image!}` : `https://api.dicebear.com/9.x/initials/svg?seed=${session?.user?.name}`} />
                                    <AvatarFallback>{`${session.user.name?.charAt(0)}`}</AvatarFallback>
                                </Avatar>
                            )}
                        </DropdownMenuTrigger>
                        {/*This is the drop down content */}
                        <DropdownMenuContent className="w-56 border-none shadow-md mt-5 mr-5">
                            <DropdownMenuLabel className="text-slate-700">
                                My Account
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4 text-slate-700" />
                                <span >Profile</span>
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
                            <DropdownMenuItem className="cursor-pointer">
                                <LogOut className="mr-2 h-4 w-4 text-slate-700" />
                                <span onClick={() => signOut()}>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )}
        </div>
    )
}

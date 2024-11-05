"use client";
import { Card } from "@/components/ui/card";
import React from "react";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export default function Dashboard() {
  return (
    <div className="w-11/12 xl:w-9/12 min-h-screen h-auto m-auto py-10">
      <div className="w-full flex flex-col gap-2 py-4">
        <h2 className="text-slate-700 font-semibold text-md lg:text-xl">
          Dashboard
        </h2>
        <p className="text-slate-500 text-xs lg:text-sm">
          Hello Welcome Admin!
        </p>
      </div>
      {/*Card */}
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card
            key={index}
            className="rounded-md h-auto p-4 cursor-pointer relative shadow-sm border-slate-300"
          >
            <h4 className="text-slate-700 text-md font-medium">
              Total Revenue
            </h4>
            <p className="text-slate-400 text-xs">+20.1% from last month</p>
            <h2 className="text-slate-700 text-lg font-semibold">$15,231.89</h2>
          </Card>
        ))}
      </div>
      <div className="flex items-center justify-between gap-2">
      
        {/* Order Table */}
        <div>
          <Table className="whitespace-nowrap">
            <TableCaption>All orders display here</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index} className="text-slate-500">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {" "}
                      <Avatar className="w-8 h-8 cursor-pointer hover:opacity-90">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <h3>John Doe</h3>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium whitespace-break-spaces">
                    Samyang Buldak Chesse
                  </TableCell>
                  <TableCell>₱86.00</TableCell>
                  <TableCell className="text-green-500">Success</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

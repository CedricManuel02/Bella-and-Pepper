"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
export default function Categories() {
  return (
    <div className="w-11/12 xl:w-9/12 min-h-screen h-auto m-auto py-10">
      <div className="py-4">
        <div className="flex justify-between flex-col items-start gap-2 lg:items-center lg:flex-row">
          <div className="space-y-1">
            <h2 className="text-slate-700 font-semibold text-md lg:text-xl">
              Categories
            </h2>
            <p className="text-slate-500 text-xs lg:text-sm">
              Manage the shop categories.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* Dialog Create Product*/}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant={"default"}
                  className="bg-green-500 hover:bg-green-600"
                >
                  Create
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-md sm:max-w-[485px]">
                <DialogHeader>
                  <DialogTitle>Create Category</DialogTitle>
                  <DialogDescription>
                    Add categories for your products
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center gap-2 justify-between md:flex-row">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="categories_name" className="text-slate-700">
                      Category
                    </Label>
                    <Input
                      type="text"
                      id="categories_name"
                      placeholder="Ex. Noodles"
                    />
                  </div>
                </div>
               
                <div className="flex flex-col items-center gap-2 justify-between md:flex-row">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="categories_image" className="text-slate-700">
                      Image
                    </Label>
                    <Input type="file" id="categories_image" />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    className="w-full bg-green-500 hover:bg-green-600"
                    type="submit"
                  >
                    Add 
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <Separator className="my-4" />
          <div className="flex h-5 items-center space-x-4 text-sm">
            <Link className="text-slate-500 text-sm" href={"/product"}>
              Categories
            </Link>
            <Separator orientation="vertical" />
            <Link className="text-slate-500 text-sm" href={"/"}>
              Archive
            </Link>
          </div>
      </div>
      <Table className="whitespace-nowrap">
        <TableCaption>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date Created</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index} className="text-slate-500">
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell className="font-medium flex items-center gap-2 whitespace-break-spaces">
                <Image
                  src={
                    "https://morueats.com/cdn/shop/products/SamyangBuldakCheeseHotChickenFlavourRamen.png?v=1677898969"
                  }
                  alt="Product Image"
                  width={60}
                  height={100}
                  loading="lazy"
                />
                <h3>Noodles</h3>
              </TableCell>
              <TableCell>September 24, 2024</TableCell>
              <TableCell>
                <div className="flex items-center gap-2 justify-end">
                  <Link href="#">Edit</Link>
                  <Separator className="h-5" orientation="vertical" />
                  <Link href="#">Delete</Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

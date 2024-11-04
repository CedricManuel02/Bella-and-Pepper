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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Barcode from "react-barcode";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Download, X } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
export default function Product() {
  return (
    <div className="w-11/12 xl:w-9/12 min-h-screen h-auto m-auto py-10">
      <div className="py-4">
        <div className="flex justify-between flex-col items-start gap-2 lg:items-center lg:flex-row">
          <div className="space-y-1">
            <h2 className="text-slate-700 font-semibold text-md lg:text-xl">
              Product
            </h2>
            <p className="text-slate-500 text-xs lg:text-sm">
              Manage the shop products.
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
                  <DialogTitle>Create Product</DialogTitle>
                  <DialogDescription>
                    Add product that will be featured
                  </DialogDescription>
                </DialogHeader>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="barcode" className="text-slate-700">
                    Barcode
                  </Label>
                  <Input type="text" id="barcode" placeholder="Product UPC" />
                </div>
                <div className="flex flex-col items-center gap-2 justify-between md:flex-row">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="product_name" className="text-slate-700">
                      Product
                    </Label>
                    <Input
                      type="text"
                      id="product_name"
                      placeholder="Ex. Samyang Buldak"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2 justify-between md:flex-row">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="product_price" className="text-slate-700">
                      Price
                    </Label>
                    <Input
                      type="number"
                      placeholder="Ex. ₱50.00"
                      id="product_price"
                    />
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="price" className="text-slate-700">
                      Category
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Drinks">Drinks</SelectItem>
                        <SelectItem value="Noodles">Noodles</SelectItem>
                        <SelectItem value="Condiments">Condiments</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2 justify-between md:flex-row">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="product_price" className="text-slate-700">
                      Image
                    </Label>
                    <Input type="file" id="product_image" />
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2 justify-between md:flex-row">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="product_price" className="text-slate-700">
                      Description
                    </Label>
                    <Textarea placeholder="Type the product description here." />
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 justify-between md:flex-row">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="product_price" className="text-slate-700">
                      Pieces to Avail
                    </Label>
                    <Input
                      type="text"
                      placeholder="Ex. 500g Pack 12 pcs"
                      id="product_price"
                    />
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="product_price" className="text-slate-700">
                      Available Stock
                    </Label>
                    <Input
                      type="number"
                      placeholder="Ex. 32"
                      id="product_price"
                    />
                  </div>
                  <Button className="w-full md:w-auto" variant={"secondary"}>
                    Add
                  </Button>
                </div>
                <div>
                  <Badge variant={"secondary"}>
                    <div className="flex items-center gap-2 justify-center text-slate-700">
                      500g Pack 12 pcs{" "}
                      <span className="text-slate-500">32 Stocks</span>{" "}
                      <X size={14} />
                    </div>
                  </Badge>
                </div>
                <DialogFooter>
                  <Button
                    className="w-full bg-green-500 hover:bg-green-600"
                    type="submit"
                  >
                    Add Product
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {/* Dialog Export */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="flex items-center gap-2 justify-center text-slate-500"
                  variant={"outline"}
                >
                  <Download size={20} />
                  Export
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[485px]">
                <DialogHeader>
                  <DialogTitle>Export Files</DialogTitle>
                  <DialogDescription>
                    Generate a file reports (e.g PDF, Excel)
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-2">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="file_name" className="text-slate-700">
                      File name
                    </Label>
                    <Input
                      type="text"
                      id="file_name"
                      placeholder="Default (Date generated)"
                    />
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="file_name" className="text-slate-700">
                      File type
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="File type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Excel">Excel</SelectItem>
                        <SelectItem value="PDF">PDF</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    className="w-full bg-green-500 hover:bg-green-600"
                    type="submit"
                  >
                    Generate
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between flex-col items-start gap-2 md:flex-row">
          <div className="flex h-5 items-center space-x-4 text-sm">
            <Link className="text-slate-500 text-sm" href={"/product"}>
              Product
            </Link>
            <Separator orientation="vertical" />
            <Link className="text-slate-500 text-sm" href={"/"}>
              Archive
            </Link>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {/* Sort */}
            <Input
              className="w-full md:w-64"
              type="text"
              placeholder="Search..."
            />
            <Select>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Name</SelectItem>
                <SelectItem value="dark">Price</SelectItem>
                <SelectItem value="system">Date Added</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
            <TableHead className="w-[150px]">Barcode</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index} className="text-slate-500">
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>
                <Barcode value={"8129375102379"} width={1.2} height={20} />
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
                <h3>Samyang Buldak Chesse</h3>
              </TableCell>
              <TableCell>Noodles</TableCell>
              <TableCell>₱86.00</TableCell>
              <TableCell>56</TableCell>
              <TableCell className="text-green-500">Active</TableCell>
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

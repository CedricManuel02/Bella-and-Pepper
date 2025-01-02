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
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
export default function Orders() {
  const router = useRouter();
  return (
    <div className="w-11/12 xl:w-9/12 min-h-screen h-auto m-auto py-10">
      <div className="py-4">
        <div className="flex justify-between flex-col items-start gap-2 lg:items-center lg:flex-row">
          <div className="space-y-1">
            <h2 className="text-slate-700 font-semibold text-md lg:text-xl">
              Orders
            </h2>
            <p className="text-slate-500 text-xs lg:text-sm">
              Manage the shop orders.
            </p>
          </div>
          <div className="flex items-center gap-2">
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
        <div className="flex justify-end flex-col items-start gap-2 md:flex-row">
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
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date of Purchase</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index} className="text-slate-500">
              <TableCell>KJIOI132KZX</TableCell>
              <TableCell className="font-medium flex items-center gap-2 whitespace-break-spaces">
                <Image
                  src={
                    "https://marketplace.canva.com/EAFqNrAJpQs/1/0/1600w/canva-neutral-pink-modern-circle-shape-linkedin-profile-picture-WAhofEY5L1U.jpg"
                  }
                  className="rounded-full"
                  alt="Profile"
                  width={30}
                  height={100}
                  loading="lazy"
                />
                <h3>Cedric Manuel</h3>
              </TableCell>
              <TableCell>₱86.00</TableCell>
              <TableCell>
                <Badge variant={"outline"} className="border border-green-500 text-green-500 font-medium">Paid</Badge>
              </TableCell>
              <TableCell>March 9, 1952 12:23 PM</TableCell>
              <TableCell className="flex items-center justify-end space-x-2">
                  <Link className="hover:underline" href="#">View</Link>
                  <Separator orientation={"vertical"} className="h-4"/>
                  <Link className="hover:underline" href="#">Print</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

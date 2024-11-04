"use client";
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Barcode from "react-barcode";
import Image from 'next/image';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Download } from 'lucide-react';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
export default function Product() {
    return (
        <div className="w-11/12 xl:w-9/12 min-h-screen h-auto m-auto py-10">
            <div>
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h2 className="text-slate-700 font-semibold text-md lg:text-xl">Product</h2>
                        <p className="text-slate-500 text-xs lg:text-sm">Manage the shop products.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* Dialog Create Product*/}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant={"default"} className="bg-green-500 hover:bg-green-600">Create Product</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[485px]">
                                <DialogHeader>
                                    <DialogTitle>Create Product</DialogTitle>
                                    <DialogDescription>
                                        Add product that will be featured
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="barcode" className="text-slate-700">Barcode</Label>
                                    <Input type="text" id="barcode" />
                                </div>
                                <div className="flex flex-col items-center gap-2 justify-between md:flex-row">
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <Label htmlFor="product_name" className="text-slate-700">Product</Label>
                                        <Input type="text" id="product_name" />
                                    </div>
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <Label htmlFor="price" className="text-slate-700">Price</Label>
                                        <Input type="number" id="price" />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button className="w-full bg-green-500 hover:bg-green-600" type="submit">Add Product</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        {/* Dialog Export */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="flex items-center gap-2 justify-center text-slate-500" variant={"outline"}><Download size={20} />Export</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[485px]">
                                <DialogHeader>
                                    <DialogTitle>Export Files</DialogTitle>
                                    <DialogDescription>
                                        Generate a file reports (e.g PDF, Excel)
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="file_name" className="text-slate-700">File name</Label>
                                    <Input type="text" id="file_name" />
                                </div>
                                <div className="grid w-full items-center gap-1.5">
                                    <Select>
                                        <SelectTrigger className="w-[150px]">
                                            <SelectValue placeholder="File type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Excel">Excel</SelectItem>
                                            <SelectItem value="PDF">PDF</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <DialogFooter>
                                    <Button className="w-full bg-green-500 hover:bg-green-600" type="submit">Download</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <Separator className="my-4"/>
                <div className="py-2 flex items-center justify-between">
                    <div className="flex h-5 items-center space-x-4 text-sm">
                        <Link href={"/product"}>Product</Link>
                        <Separator orientation="vertical" />
                        <Link href={"/"}>Archive</Link>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* Sort */}
                        <Input className="w-64" type="text" placeholder="Search..." />
                        <Select>
                            <SelectTrigger className="w-[150px]">
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
            <Table>
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
                            <TableCell><Checkbox /></TableCell>
                            <TableCell><Barcode value={"8129375102379"} width={1.2} height={20} /></TableCell>
                            <TableCell className="font-medium flex items-center gap-2">
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
    )
}
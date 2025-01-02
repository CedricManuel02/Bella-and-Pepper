"use client";
import React, { useEffect, useState } from "react"
import { z } from "zod";
import { getProductsInformation } from "../../../../../../../actions/productServerAction";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { CategoriesInterface, ProductInterface } from "../../../../../../../typings";
import { getCategoryList } from "../../../../../../../actions/categoryServerAction";

const formsEditProduct = z.object({
    product_upc: z.string().min(1, { message: "Product UPC is required" }),
    product_name: z.string().min(1, { message: "Product name is required" }),
    product_category: z.string().min(1, { message: "Category is required" }),
    product_description: z.string().min(1, { message: "Description is required" }),
});


export default function EditFormContainer({ id }: { id: string }) {
    const [data, setData] = useState<ProductInterface>();
    const [categories, setCategories] = useState<CategoriesInterface[]>([]);
    const form = useForm<z.infer<typeof formsEditProduct>>({
        resolver: zodResolver(formsEditProduct),
        defaultValues: {
            product_upc: "",
            product_name: "",
            product_category: "",
            product_description: "",
        },
    });

    const getProducts = async () => {
        try {
            const response = await getProductsInformation(id);
            console.log(response);
            setData(response.data);

        } catch (error) {
            console.log("Something went wrong", error);
        }
    }

    const getCategorie = async () => {
        try {
            const response = await getCategoryList();
            setCategories(response.data);
        } catch (error) {
            console.log("Something went wrong", error);
        }
    }
    useEffect(() => {
        getProducts();
        getCategorie();
    }, [id]);

    const onSubmit = (values: z.infer<typeof formsEditProduct>) => {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-2">
                <FormField
                    control={form.control}
                    name="product_upc"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel className="font-medium text-slate-500">Barcode</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} value={data?.product_upc_number} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex items-center justify-between gap-2">
                    <FormField
                        control={form.control}
                        name="product_name"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="font-medium text-slate-500">Product Name</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} value={data?.product_name} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="product_category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-medium text-slate-500">Category</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="min-w-44">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Category</SelectLabel>
                                                {categories.map((category) => (
                                                    <SelectItem value={category.category_id} key={category.category_id}>
                                                        {category.category_name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="product_description"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel className="font-medium text-slate-500">Description</FormLabel>
                            <FormControl>
                                <Textarea className="h-auto" placeholder="Enter product description" {...field} value={data?.product_description} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex items-center justify-between w-full">
                    <h3 className="font-semibold text-sm text-slate-700 py-4">Variant</h3>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="link" className="text-green-500 hover:text-green-600">
                                <Plus /> Add Variant
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[525px]">
                            <DialogHeader>
                                <DialogTitle>Create Variant</DialogTitle>
                                <DialogDescription>
                                    Create a variant for the specified product
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                {/* Variant Name */}
                                <div className="w-full">
                                    <label className="font-medium text-slate-500">Name</label>
                                    <Input
                                        type="text"
                                        placeholder="Enter variant name"
                                        className="w-full mt-1 p-2 border border-gray-300 rounded"
                                    />
                                </div>

                                {/* Variant Image */}
                                <div className="w-full">
                                    <label className="font-medium text-slate-500">Image</label>
                                    <Input
                                        type="file"
                                        className="w-full mt-1 p-2 border border-gray-300 rounded"
                                    />
                                </div>

                                <div className="flex items-center justify-between gap-2">
                                    {/* Variant Price */}
                                    <div className="w-full">
                                        <label className="font-medium text-slate-500">Price</label>
                                        <Input
                                            type="text"
                                            placeholder="₱30.00"
                                        />
                                    </div>
                                    {/* Variant Stocks */}
                                    <div className="w-56">
                                        <label className="font-medium text-slate-500">Stocks</label>
                                        <Input
                                            type="number"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between gap-2">
                                    {/* Variant Discount */}
                                    <div className="w-full">
                                        <label className="font-medium text-slate-500 flex items-center gap-2">Discount <p className="text-slate-500 font-normal text-sm">(Optional)</p></label>
                                        <Input
                                            type="number"
                                            className="w-full mt-1 p-2 border border-gray-300 rounded"
                                        />
                                    </div>

                                    {/* Discount End Date */}
                                    <div className="w-full">
                                        <label className="font-medium text-slate-500">Discount End Date</label>
                                        <Input
                                            type="date"
                                            className="w-full mt-1 p-2 border border-gray-300 rounded"
                                        />
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="button">Add</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                <Table>
                    <TableCaption>A list of your variants.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[250px]">Name</TableHead>
                            <TableHead className="w-[80px]">Price</TableHead>
                            <TableHead>Discount</TableHead>
                            <TableHead>Discount End Date</TableHead>
                            <TableHead className="w-[80px]">Stock</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.tbl_variants.map((variant, index) => (
                            <TableRow key={index}>
                                <TableCell className="flex items-center gap-2">
                                    {variant.variant_image && (
                                        <img src={`http://localhost:3001/${variant.variant_image}`} alt="variant" className="w-12 shadow rounded p-2 h-12 object-contain" />
                                    )}
                                    <Input
                                        type="text"
                                        value={variant.variant_name}
                                        className="w-full"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="text"
                                        value={variant.variant_price}
                                        className="w-full"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="text"
                                        value={variant.variant_discount}
                                        className="w-full"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="date"
                                        value={variant.variant_discount_end_date}
                                        className="w-full"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        value={variant.variant_stocks}
                                        className="w-full"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        type="button"
                                        variant={"link"}
                                        className="text-red-500"
                                    >
                                        Remove
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div className="flex items-center justify-end">
                    <Button type="submit">Create</Button>
                </div>
            </form>
        </Form>
    )
}

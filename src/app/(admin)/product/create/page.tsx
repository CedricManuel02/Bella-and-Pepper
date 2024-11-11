"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formsCreateProduct = z.object({
    product_upc: z.string().min(1, { message: "Product UPC is required" }),
    product_name: z.string().min(1, { message: "Product name is required" }),
    product_category: z.string().min(1, { message: "Category is required" }),
    product_description: z.string().min(1, { message: "Description is required" }),
    product_image: z.string().min(1, { message: "Image is required" }),
});

export default function ProductCreate() {

    const form = useForm<z.infer<typeof formsCreateProduct>>({
        resolver: zodResolver(formsCreateProduct),
        defaultValues: {
            product_upc: "",
            product_name: "",
            product_category: "",
            product_description: "",
            product_image: "",
        },
    })
    // function for submitting
    function onSubmit(values: z.infer<typeof formsCreateProduct>) {
        console.log(values);
    }
    return (
        <div className="w-8/12 xl:w-5/12 min-h-screen h-auto m-auto py-10">
            <h3 className="font-semibold text-sm text-slate-700 py-4">Create Product</h3>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    <FormField
                        control={form.control}
                        name="product_upc"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="font-medium text-slate-500">Barcode</FormLabel>
                                <FormControl>
                                    <Input type="text"  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex items-center justify-between gap-2 ">
                        <FormField
                            control={form.control}
                            name="product_name"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="font-medium text-slate-500">Product Name</FormLabel>
                                    <FormControl>
                                        <Input type="text"  {...field} />
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
                                                    <SelectItem value="Noodles">Noodles</SelectItem>
                                                    <SelectItem value="Drinks">Drinks</SelectItem>
                                                    <SelectItem value="Snacks">Snacks</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>


                    <Button type="submit" className="w-full">Checkout</Button>
                </form>
            </Form>
        </div>
    )
}

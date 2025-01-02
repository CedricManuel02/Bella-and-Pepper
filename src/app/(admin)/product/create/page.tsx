'use client'

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { VariantInterface, CategoriesInterface } from '../../../../../typings';

const formsCreateProduct = z.object({
    product_upc: z.string().min(1, { message: "Product UPC is required" }),
    product_name: z.string().min(1, { message: "Product name is required" }),
    product_category: z.string().min(1, { message: "Category is required" }),
    product_description: z.string().min(1, { message: "Description is required" }),
});


export default function ProductCreate() {
    const [categories, setCategories] = useState<CategoriesInterface[]>([]);
    const [variants, setVariants] = useState<VariantInterface[]>([]); // Store added variants

    const [variantName, setVariantName] = useState('');
    const [variantPrice, setVariantPrice] = useState('');
    const [variantDiscount, setVariantDiscount] = useState('');
    const [variantStocks, setVariantStocks] = useState('');
    const [variantImage, setVariantImage] = useState<File | null>(null);
    const [variantDiscountEndDate, setVariantDiscountEndDate] = useState('');

    const form = useForm<z.infer<typeof formsCreateProduct>>({
        resolver: zodResolver(formsCreateProduct),
        defaultValues: {
            product_upc: "",
            product_name: "",
            product_category: "",
            product_description: "",
        },
    });

    useEffect(() => {
        const category = async () => {
            const response = await fetch("http://localhost:3001/api/v1/get-categories", {
                method: "GET",
            });
            const data = await response.json();
            setCategories(data.data);
        };
        category();
    }, []);

    // Function to handle adding variants
    const addVariant = () => {
        const newVariant: VariantInterface = {
            variant_name: variantName,
            variant_price: variantPrice,
            variant_discount: variantDiscount,
            variant_stocks: variantStocks,
            variant_image: variantImage,
            variant_discount_end_date: variantDiscountEndDate,
        };

        setVariants([...variants, newVariant]);

        // Reset variant fields after adding it
        setVariantName('');
        setVariantPrice('');
        setVariantDiscount('');
        setVariantStocks('');
        setVariantImage(null);
        setVariantDiscountEndDate('');
    };

    // Handle form submission (product creation)
    async function onSubmit(values: z.infer<typeof formsCreateProduct>) {
        // Ensure there is at least one variant before submitting
        if (variants.length === 0) {
            alert("You must add at least one variant.");
            return;
        }
    
        console.log("Product Data: ", values);
        console.log("Variants: ", variants);
    
        // Build the array of images
        const arrayOfImage: File[] = [];
        variants.forEach((variant) => {
            if (variant.variant_image) {
                arrayOfImage.push(variant.variant_image);
            }
        });
    
        console.log("This is the array of images:", arrayOfImage);
    
        // Create FormData for submission
        const formData = new FormData();
    
        // Append product data
        formData.append("product_upc", values.product_upc);
        formData.append("product_name", values.product_name);
        formData.append("product_category", values.product_category);
        formData.append("product_description", values.product_description);
        formData.append("variants", JSON.stringify(variants));
        
        // Append images to FormData
        arrayOfImage.forEach((image, index) => {
            formData.append(`variant_image`, image); // Use the same key `images` for multer array handling
        });
    
        // Submit the FormData
        try {
            const response = await fetch("http://localhost:3001/api/v1/create-product", {
                method: "POST",
                body: formData,
            });
    
            const data = await response.json();
    
            if (response.ok) {
                alert("Product created successfully!");
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    }
    
    

    // Delete variant by index
    const deleteVariant = (index: number) => {
        const updatedVariants = variants.filter((_, i) => i !== index);
        setVariants(updatedVariants);
    };

    // Handle file input for variant image
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null; // Ensure it defaults to null if undefined
        setVariantImage(file);
    };

    // Handle editing the variant data inline
    const handleVariantChange = (index: number, field: keyof VariantInterface, value: string) => {
        const updatedVariants = [...variants];
        updatedVariants[index] = { ...updatedVariants[index], [field]: value };
        setVariants(updatedVariants);
    };

    return (
        <div className="w-8/12 xl:w-6/12 min-h-screen h-auto m-auto py-10">
            <h3 className="font-semibold text-sm text-slate-700 py-4">Create Product</h3>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-2">
                    <FormField
                        control={form.control}
                        name="product_upc"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel className="font-medium text-slate-500">Barcode</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
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
                                        <Input type="text" {...field} />
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
                                    <Textarea placeholder="Enter product description" {...field} />
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
                                            value={variantName}
                                            onChange={(e) => setVariantName(e.target.value)} // manage state manually
                                            className="w-full mt-1 p-2 border border-gray-300 rounded"
                                        />
                                    </div>

                                    {/* Variant Image */}
                                    <div className="w-full">
                                        <label className="font-medium text-slate-500">Image</label>
                                        <Input
                                            type="file"
                                            onChange={handleFileChange} // handle file input
                                            className="w-full mt-1 p-2 border border-gray-300 rounded"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between gap-2">
                                        {/* Variant Price */}
                                        <div className="w-full">
                                            <label className="font-medium text-slate-500">Price</label>
                                            <Input
                                                type="text"
                                                value={variantPrice}
                                                onChange={(e) => setVariantPrice(e.target.value)} // handle price input
                                                placeholder="₱30.00"
                                            />
                                        </div>
                                        {/* Variant Stocks */}
                                        <div className="w-56">
                                            <label className="font-medium text-slate-500">Stocks</label>
                                            <Input
                                                type="number"
                                                value={variantStocks}
                                                onChange={(e) => setVariantStocks(e.target.value)} // handle stock input
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between gap-2">
                                        {/* Variant Discount */}
                                        <div className="w-full">
                                            <label className="font-medium text-slate-500 flex items-center gap-2">Discount <p className="text-slate-500 font-normal text-sm">(Optional)</p></label>
                                            <Input
                                                type="number"
                                                value={variantDiscount}
                                                onChange={(e) => setVariantDiscount(e.target.value)} // handle discount input
                                                className="w-full mt-1 p-2 border border-gray-300 rounded"
                                            />
                                        </div>

                                        {/* Discount End Date */}
                                        <div className="w-full">
                                            <label className="font-medium text-slate-500">Discount End Date</label>
                                            <Input
                                                type="date"
                                                value={variantDiscountEndDate}
                                                onChange={(e) => setVariantDiscountEndDate(e.target.value)} // handle end date input
                                                className="w-full mt-1 p-2 border border-gray-300 rounded"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="button" onClick={addVariant}>Add</Button>
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
                            {variants.map((variant, index) => (
                                <TableRow key={index}>
                                    <TableCell className="flex items-center gap-2">
                                        {variant.variant_image && (
                                            <img src={URL.createObjectURL(variant.variant_image)} alt="variant" className="w-12 shadow rounded p-2 h-12 object-contain" />
                                        )}
                                        <Input
                                            type="text"
                                            value={variant.variant_name}
                                            onChange={(e) => handleVariantChange(index, 'variant_name', e.target.value)}
                                            className="w-full"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            type="text"
                                            value={variant.variant_price}
                                            onChange={(e) => handleVariantChange(index, 'variant_price', e.target.value)}
                                            className="w-full"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            type="text"
                                            value={variant.variant_discount}
                                            onChange={(e) => handleVariantChange(index, 'variant_discount', e.target.value)}
                                            className="w-full"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            type="date"
                                            value={variant.variant_discount_end_date}
                                            onChange={(e) => handleVariantChange(index, 'variant_discount_end_date', e.target.value)}
                                            className="w-full"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            type="number"
                                            value={variant.variant_stocks}
                                            onChange={(e) => handleVariantChange(index, 'variant_stocks', e.target.value)}
                                            className="w-full"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            type="button"
                                            variant={"link"}
                                            className="text-red-500"
                                            onClick={() => deleteVariant(index)}
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
        </div>
    );
}

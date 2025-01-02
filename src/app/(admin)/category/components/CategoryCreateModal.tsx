"use client";

import { z } from "zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { LoaderCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategory } from "../../../../../actions/serverAction";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const MAX_FILE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formCategorySchema = z.object({
    category_name: z.string().min(1, { message: "Category Name is required" }),
    category_image: z
        .instanceof(File)
        .or(z.null())
        .refine((file) => !file || file.size <= MAX_FILE, { message: "File size must be less than 50KB" })
        .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), { message: "Invalid file type" }),
});

export default function CategoryCreateModal() {
    const [loading, setLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const form = useForm<z.infer<typeof formCategorySchema>>({
        resolver: zodResolver(formCategorySchema),
        defaultValues: {
            category_name: "",
            category_image: undefined,
        },
    });

    async function onSubmit(values: z.infer<typeof formCategorySchema>) {
        setLoading(true);
        const formData = new FormData();
        formData.append("category_name", values.category_name);

        if (values.category_image) {
            formData.append("category_image", values.category_image);
        }

        try {
            const result = await createCategory(formData);
            console.log("Category created:", result);
            setLoading(false);
            setIsOpen(false);

        } catch (error) {
            console.error("Error creating category:", error);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 justify-center text-slate-500" variant={"outline"}>
                    Create
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                    <DialogTitle>Create Category</DialogTitle>
                    <DialogDescription>
                        Create a category for the product that can be displayed through the list of categories.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-2">
                        <FormField
                            control={form.control}
                            name="category_name"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="font-medium text-slate-500">Category</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Enter category" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category_image"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="font-medium text-slate-500">Upload Image</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            accept={ACCEPTED_IMAGE_TYPES.join(",")}
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                field.onChange(file); // Update field value with selected file
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button className="bg-green-500 hover:bg-green-600" type="submit">
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <LoaderCircleIcon size={14} className="animate-spin" />
                                        Creating...
                                    </span>
                                ) : "Create"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

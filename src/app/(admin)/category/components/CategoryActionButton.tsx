"use client";
import { z } from "zod";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircleIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteCategory, updateCategory } from "../../../../../actions/serverAction";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const MAX_FILE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formCategorySchema = z.object({
    category_id: z.string().min(1, { message: "Category ID is required" }),
    category_name: z.string().min(1, { message: "Category Name is required" }),
    category_image: z
        .instanceof(File)
        .or(z.null())
        .refine((file) => !file || file.size <= MAX_FILE, { message: "File size must be less than 50KB" })
        .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), { message: "Invalid file type" }),
});

export default function CategoryActionButton({category_id} : any) {
    const [loading, setLoading] = useState<boolean>(false);
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

    // Form for the edit function
    const form = useForm<z.infer<typeof formCategorySchema>>({
        resolver: zodResolver(formCategorySchema),
        defaultValues: {
            category_id: "",
            category_name: "",
            category_image: undefined,
        },
    });

    // Submit function for the edit
    async function onSubmit(values: z.infer<typeof formCategorySchema>) {

        const formData = new FormData();
        setLoading(true);
        formData.append("category_name", values.category_name);

        if (values.category_image) {
            formData.append("category_image", values.category_image);
        }

        try {
            const result = await updateCategory(formData);
            console.log("Category created:", result);
            setLoading(false);
        } catch (error) {
            console.error("Error creating category:", error);
        }
    }

    async function handleGetCategory(category_id: string) {
        const response = await fetch(`http://localhost:3001/api/v1/find-category`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ category_id })
        })

        const data = await response.json();

        form.setValue("category_id", data.data.category_id);
        form.setValue("category_name", data.data.category_name);
        form.setValue("category_image", data.data.category_image);
    }
    return (
        <React.Fragment>
            {/* Edit Button with Dialog */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogTrigger asChild>
                    <Button onClick={() => handleGetCategory(category_id)} className="w-full" variant={"outline"}>Edit</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[480px]">
                    <DialogHeader>
                        <DialogTitle>Update Category</DialogTitle>
                        <DialogDescription className="text-red-400">Any changes to this product will change all the information related to it.</DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-2">
                            <FormField
                                control={form.control}
                                name="category_id"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Input type="hidden" placeholder="Enter category" {...field} value={field.value || ""} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                          
                            <FormField
                                control={form.control}
                                name="category_name"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel className="font-medium text-slate-500">Category</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Enter category" {...field} value={field.value || ""} />
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
                                            <div className="flex items-center space-x-2">
                                                <Input
                                                    type="file"
                                                    accept={ACCEPTED_IMAGE_TYPES.join(",")}
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        field.onChange(file);
                                                    }}
                                                />
                                                <Image
                                                    className="w-12 h-12 shadow rounded p-2 object-contain"
                                                    src={`http://localhost:3001/${field.value}`}
                                                    width={50}
                                                    height={50}
                                                    loading={"lazy"}
                                                    alt={"Image"}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button className="mt-4 bg-green-500 hover:bg-green-600" type="submit">
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <LoaderCircleIcon size={14} className="animate-spin" />
                                            Updating...
                                        </span>
                                    ) : "Update"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
            {/* Delete Button with Dialog */}
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogTrigger asChild>
                    <Button className="w-full" variant={"destructive"}>Delete</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                            This will remove your category from the list.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant={"outline"}>
                                Close
                            </Button>
                        </DialogClose>
                        <Button onClick={() => deleteCategory(category_id)} type="button" variant={"destructive"}>Yes, Delete!</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    )
}

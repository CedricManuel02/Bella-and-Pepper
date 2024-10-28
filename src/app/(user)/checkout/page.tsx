"use client"
import React from "react"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Star } from "lucide-react";
import Image from "next/image";

const formsCheckoutSchema = z.object({
    firstname: z.string().min(1, { message: "First name is required" }),
    lastname: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email().min(1, { message: "Email is required" }),
    phone: z.string().min(1, { message: "Phone is required" }),
    country: z.string().min(1, { message: "Country / Region is required" }),
    address: z.string().min(1, { message: "Address is required" }),
    province: z.string().min(1, { message: "City/ Municipality is required" }),
    zipcode: z.string().min(1, { message: "Zip code is required" }),
});


export default function Checkout() {

    const form = useForm<z.infer<typeof formsCheckoutSchema>>({
        resolver: zodResolver(formsCheckoutSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            country: "",
            address: "",
            province: "",
            zipcode: "",
        },
    })
    // function for submitting
    function onSubmit(values: z.infer<typeof formsCheckoutSchema>) {
        console.log(values);
    }

    return (
        <div className="w-11/12 xl:w-9/12 min-h-screen h-auto m-auto py-5 flex gap-10 justify-center items-center flex-col-reverse md:flex-row">
            {/* Information */}
            <div className="w-full md:w-10/12 md:h-screen md:py-10">
                <h3 className="font-semibold text-sm text-slate-700 py-4">Information</h3>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                        <div className="flex items-center justify-between gap-2 ">
                            <FormField
                                control={form.control}
                                name="firstname"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel className="font-medium text-slate-500">First name</FormLabel>
                                        <FormControl>
                                            <Input  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastname"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel className="font-medium text-slate-500">Last name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-medium text-slate-500">Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-medium text-slate-500">Phone</FormLabel>
                                    <FormControl>
                                        <Input type="tel" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-medium text-slate-500">Country / Region</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select your country" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Country</SelectLabel>
                                                    <SelectItem value="Philippines">Philippines</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-medium text-slate-500">Address</FormLabel>
                                    <FormControl>
                                        <Input type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center justify-between gap-2 ">
                            <FormField
                                control={form.control}
                                name="province"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel className="font-medium text-slate-500">City, Province</FormLabel>
                                        <FormControl>
                                            <Input type="text" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="zipcode"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel className="font-medium text-slate-500">ZIP Code</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex items-center space-x-2 py-4">
                            <Checkbox id="terms" />
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium text-slate-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Save this Information for the next time
                            </label>
                        </div>
                        <Button type="submit" className="w-full">Checkout</Button>
                    </form>
                </Form>
            </div>
            {/* Product */}
            <div className="w-full md:w-8/12 md:h-screen md:py-10">
                <h3 className="font-semibold text-sm text-slate-700 py-4">Product</h3>
                <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Image
                        src={
                            "https://morueats.com/cdn/shop/products/SamyangBuldakCheeseHotChickenFlavourRamen.png?v=1677898969"
                        }
                        alt="image"
                        width={80}
                        height={100}
                        loading="lazy"
                    />
                    <section>
                        <h3 className="text-slate-700 text-xs md:text-sm font-medium">
                            Samyang Buldak Carbonara
                        </h3>
                        <div className="flex items-center gap-2">
                            <h4 className="text-green-500 font-medium">₱59.00</h4>
                            <p className="line-through text-xs text-slate-500">
                                ₱78.00
                            </p>
                        </div>
                    </section>
                </div>
                <p className="text-slate-500">x1</p>
                </div>

                {/* Total Section */}
                <div className="py-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm py-2 text-slate-700 font-medium">Sub Total</h3>
                        <p>₱120.00</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm py-2 text-slate-700 font-medium">Shipping Fee</h3>
                        <p>₱80.00</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm py-2 text-slate-700 font-medium">Total</h3>
                        <p className="text-xl">₱120.00</p>
                    </div>
                </div>

                {/* Promo Code Section */}
                <div className="flex items-center gap-2">
                    <Input placeholder={"Enter promo code"}/>
                    <Button variant={"default"} className="bg-black text-white">Apply</Button>
                </div>
            </div>
        </div>
    )
}

"use client"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input";
import React from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button";
import ProfileSidebar from "@/app/components/shared/ProfileSidebar"


const formResetPasswordSchema = z.object({
    user_password: z.string().min(1, { message: "Password is required" }).length(8, { message: "Password must be 9 digits long" }),
    user_new_password: z.string().min(1, { message: "New Password is required" }).length(8, { message: "Password must be 9 digits long" }),
    user_confirm_password: z.string().min(1, { message: "Confirm password is required" }).length(8, { message: "Password must be 9 digits long" }),
}).refine((data) => data.user_new_password === data.user_confirm_password, {
    message: "Password dont match",
    path: ["/user_confirm_password"]
});


export default function ChangePassword() {
    const form = useForm<z.infer<typeof formResetPasswordSchema>>({
        resolver: zodResolver(formResetPasswordSchema),
        defaultValues: {
            user_password: "",
            user_new_password: "",
            user_confirm_password: "",
        }
    });
    async function onSubmit(values: z.infer<typeof formResetPasswordSchema>) {
        console.log(values);
    }   
    return (
        <div className="w-11/12 xl:w-9/12 flex justify-center min-h-screen h-auto m-auto py-10">
            <ProfileSidebar />
            {/* Profile Form Section */}
            <div className="px-8 w-8/12">
                <h2 className="py-4 text-slate-700 font-semibold text-md">Reset Password</h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="user_password"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="font-medium text-slate-700">Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" id="user_password" placeholder="Enter your password"  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}

                        />
                        <FormField
                            control={form.control}
                            name="user_new_password"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="font-medium text-slate-700">New Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" id="user_new_password" placeholder="Enter your new password"  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="user_confirm_password"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                <FormLabel className="font-medium text-slate-700">Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type="password" id="user_confirm_password" placeholder="Confirm Password"  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <div className="mt-6 flex items-center justify-end">
                            <Button className="bg-green-500 hover:bg-green-600" type="submit">Change Password</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

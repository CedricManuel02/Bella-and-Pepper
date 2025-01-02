"use client";
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formResetPasswordSchema = z.object({
    new_password: z.string().length(8, {message: "Password must be 8 characters long"}).min(1, { message: "Password is required" }),
    confirm_password: z.string().length(8, {message: "Password must be 8 characters long"}).min(1, { message: "Confirm Password is required" })
}).refine((data) => data.new_password === data.confirm_password, {
    message: "Password don't match",
    path: ["confirm_password"]
})

export default function ResetPassword() {

    const form = useForm<z.infer<typeof formResetPasswordSchema>>({
        resolver: zodResolver(formResetPasswordSchema),
        defaultValues: {
            new_password: "",
            confirm_password: "",
        }
    });

    function onSubmit(values: z.infer<typeof formResetPasswordSchema>) {
        console.log(values);
    }

    return (
        <div className="w-11/12 xl:w-9/12 min-h-screen h-auto m-auto py-10 flex items-center justify-center">
            <Card className="border-none shadow-none md:shadow-md w-full sm:max-w-[450px]">
                <CardHeader>
                    <h3 className="text-slate-700 text-lg font-semibold">Change Password</h3>
                    <p className="text-slate-500 text-sm">Enter a new password below to change your password.</p>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="new_password"
                                render={({ field }) => (
                                   <FormItem className="w-full">
                                    <FormLabel className="font-medium text-slate-700">New Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Enter your new password" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                   </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirm_password"
                                render={({ field }) => (
                                   <FormItem className="w-full">
                                    <FormLabel className="font-medium text-slate-700">Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Confirm your password" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                   </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter className="flex justify-end gap-4">
                            <Button className="bg-green-500" type="submit">Confirm</Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    )
}

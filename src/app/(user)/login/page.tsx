// DONE CODE CLEANING //
"use client"
import { z } from "zod"
import Link from "next/link"
import Image from "next/image"
import React, { useState } from "react"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { formLoginSchema } from "@/schema/zodSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import ButtonComponent from "@/app/components/shared/ButtonComponent"

export default function Login() {
    const router = useRouter()
    const [error, setError] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    // Form with defaults value
    const form = useForm<z.infer<typeof formLoginSchema>>({
        resolver: zodResolver(formLoginSchema),
        defaultValues: {
            user_email: "",
            user_password: "",
        },
    })

    // Login form submit handler
    async function onSubmit(values: z.infer<typeof formLoginSchema>) {
        setError(false)
        setLoading(true)
        try {
            const response = await signIn("credentials", { ...values, redirect: false })
            if (response?.ok) return router.push("/")
            setError(true);
        } catch (error) {
            console.error("Something went wrong while logging in", error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-11/12 xl:w-9/12 min-h-screen h-auto m-auto py-10 flex items-center justify-center">
            <Card className="border-none shadow-none md:shadow-md w-full sm:max-w-[450px]">
                <CardHeader>
                    <h3 className="text-slate-700 text-lg font-semibold">Login</h3>
                    <p className="text-slate-500 text-sm">Try to explore more delicious food!</p>
                    {error &&
                        <div className="text-sm bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">Incorrect email or password.</span>
                        </div>}
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent>
                            <div className="grid gap-4 py-4">
                                <FormField
                                    control={form.control}
                                    name="user_email"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel className="font-medium text-slate-700">Email</FormLabel>
                                            <FormControl>
                                                <Input type="email" id="user_email" placeholder="Enter your email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="user_password"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel className="font-medium text-slate-700">Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" id="user_password" placeholder="Enter your password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="remember-me" />
                                    <label htmlFor="remember-me" className="text-sm">Remember Me</label>
                                </div>
                                <Link href="/forgot-password" className="text-sm hover:text-green-600 hover:underline">Forgot Password?</Link>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-2">
                            <ButtonComponent variant={"default"} type={"submit"} loading={loading} text={"Sign in"} textLoading={"Signing in..."} disabled={loading}/>
                            <p className="text-slate-700 text-sm py-2">Don"t have an account? <Link className="text-sm hover:text-green-600 hover:underline" href="/register">Sign up</Link></p>
                            <div className="text-slate-700 text-sm">OR</div>
                            <Button type="button" onClick={() => signIn("google", { callbackUrl: "http://localhost:3000" })} className="w-full flex items-center gap-2 justify-center" variant="outline">
                                <Image
                                    src="https://pngimg.com/d/google_PNG19635.png"
                                    alt="Google"
                                    width={20}
                                    height={20}
                                    loading="lazy"
                                />
                                Sign in with Google
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    )
}

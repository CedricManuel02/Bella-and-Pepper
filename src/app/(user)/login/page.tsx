import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Login() {
    return (
        <div className="w-11/12 xl:w-9/12 min-h-screen h-auto m-auto py-10 flex items-center justify-center">
            <Card className="border-none shadow-none md:shadow-md w-full sm:max-w-[450px]">
                <CardHeader>
                    <h3 className="text-slate-700 text-lg font-semibold">Login</h3>
                    <p className="text-slate-500 text-sm">Try to explore more delicious food!</p>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 py-4">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="email" className="text-slate-700">Email</Label>
                            <Input type="email" id="email" placeholder="Enter your email" />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="password" className="text-slate-700">Password</Label>
                            <Input type="password" id="password" placeholder="Enter your password" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="remember-me" />
                            <label htmlFor="remember-me" className="text-sm">Remember Me</label>
                        </div>
                        <Link href={"/forgot-password"} className="text-sm hover:text-green-600 hover:underline">Forgot Password?</Link>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                    <Button className="w-full bg-green-500" type="submit">Sign In</Button>
                    <p className="text-slate-500 text-sm py-2">Don&apos;t have an account? <Link className="text-sm hover:text-green-600 hover:underline" href={"/register"}>Sign up</Link></p>
                    <div className="divider text-slate-500 text-sm">OR</div>
                    <Button className="w-full flex items-center gap-2 justify-center" variant={"outline"}>
                        <Image
                        src={"https://pngimg.com/d/google_PNG19635.png"}
                        alt="Google"
                        width={20}
                        height={20}
                        loading="lazy"
                        />
                        Sign in with Google
                    </Button>
                    <Button className="w-full flex items-center gap-2 justify-center" variant={"outline"}>
                        <Image
                        src={"https://freepnglogo.com/images/all_img/facebook-circle-logo-png.png"}
                        alt="Facebook"
                        width={20}
                        height={20}
                        loading="lazy"
                        />
                        Sign in with Facebook
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

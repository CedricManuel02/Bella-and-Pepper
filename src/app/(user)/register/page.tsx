import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import React from 'react'

export default function Register() {
    return (
        <div className="w-11/12 xl:w-9/12  min-h-screen h-auto m-auto py-10 flex items-center justify-center">
            <Card className="border-none shadow-none md:shadow-md w-full sm:max-w-[450px]">
                <CardHeader>
                    <h3 className="text-slate-700 text-lg font-semibold">Register</h3>
                    <p className="text-slate-500 text-sm">Let&apos;s connect to your favorite food!</p>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="flex flex-col items-center gap-2 justify-between md:flex-row">
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="firstname" className="text-slate-700">First Name</Label>
                                <Input type="firstname" id="firstname" placeholder="Enter your firstname" />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="lastname" className="text-slate-700">Last Name</Label>
                                <Input type="lastname" id="lastname" placeholder="Enter your lastname" />
                            </div>
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="email" className="text-slate-700">Email</Label>
                            <Input type="email" id="email" placeholder="Enter your email" />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="password" className="text-slate-700">Password</Label>
                            <Input type="password" id="password" placeholder="Enter your password" />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="confirm_password" className="text-slate-700">Confirm Password</Label>
                            <Input type="password" id="confirm_password" placeholder="Confirm your password" />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button className="w-full bg-green-500" type="submit">Sign Up</Button>
                    <p className="text-slate-500 text-sm">Already have an account? <Link className="text-sm hover:text-green-600 hover:underline" href={"/login"}>Sign in</Link></p>
                </CardFooter>
            </Card>
        </div>
    )
}

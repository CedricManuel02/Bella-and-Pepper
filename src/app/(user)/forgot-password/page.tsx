import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

export default function ForgotPassword() {
    return (
        <div className="w-11/12 xl:w-9/12 h-screen m-auto py-10 flex items-center justify-center">
         <Card className="border-none shadow-none md:shadow-md w-full sm:max-w-[450px]">
                <CardHeader>
                    <h3 className="text-slate-700 text-lg font-semibold">Forgot Password</h3>
                    <p className="text-slate-500 text-sm">We will send you a link through email.</p>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="email" className="text-slate-700">Enter you email</Label>
                            <Input type="email" id="email" placeholder="Enter your email" />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button className="w-full bg-green-500" type="submit">Send</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

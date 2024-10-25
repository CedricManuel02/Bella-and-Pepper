import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import React from 'react'
export default function LoginModal() {
  return (
    <React.Fragment>
     <Dialog>
      <DialogTrigger asChild>
        <label className="text-sm px-2 text-slate-700 cursor-pointer hover:text-green-500 hover:underline">Login</label>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[385px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Try to explore more delicious food!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email" className="text-slate-700">Email</Label>
            <Input type="email" id="email" placeholder="Enter your email" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password" className="text-slate-700">Password</Label>
            <Input type="password" id="password" placeholder="Enter your password" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox id="remember-me" />
            <label htmlFor="remember-me" className="text-sm">Remember Me</label>
          </div>
          <Link href={"#"} className="text-sm hover:text-green-500 hover:underline">Forgot Password?</Link>
        </div>
        <DialogFooter>
          <Button className="w-full bg-green-500" type="submit">Sign In</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
   </React.Fragment>
  )
}

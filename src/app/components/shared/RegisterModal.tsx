import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

export default function RegisterModal() {
  return (
    <React.Fragment>
      <Dialog>
      <DialogTrigger asChild>
        <label className="text-sm text-slate-700 cursor-pointer hover:text-green-500 hover:underline">Register</label>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[385px]">
        <DialogHeader>
          <DialogTitle>Register</DialogTitle>
          <DialogDescription>
            Let&apos;s connect to your favorite food!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center gap-2 justify-between md:flex-row">
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="firstname" className="text-slate-700">First Name</Label>
                <Input type="firstname" id="firstname"/>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="lastname" className="text-slate-700">Last Name</Label>
                <Input type="lastname" id="lastname"/>
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email" className="text-slate-700">Email</Label>
            <Input type="email" id="email" placeholder="Enter your email"/>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password" className="text-slate-700">Password</Label>
            <Input type="password" id="password" placeholder="Enter your password"/>
          </div>
        </div>
        <DialogFooter>
          <Button className="w-full bg-green-500" type="submit">Sign up</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </React.Fragment>
  )
}

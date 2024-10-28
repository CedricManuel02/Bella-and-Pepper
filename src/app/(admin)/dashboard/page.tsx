import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

export default function Dashboard() {
  return (
    <div className="h-screen w-full">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"default"}>Create Product</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[485px]">
          <DialogHeader>
            <DialogTitle>Create Product</DialogTitle>
            <DialogDescription>
              Add product that will be featured
            </DialogDescription>
          </DialogHeader>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="barcode" className="text-slate-700">Barcode</Label>
            <Input type="text" id="barcode" />
          </div>
          <div className="flex flex-col items-center gap-2 justify-between md:flex-row">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="product_name" className="text-slate-700">Product</Label>
              <Input type="text" id="product_name" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="price" className="text-slate-700">Price</Label>
              <Input type="number" id="price" />
            </div>
          </div>
          <DialogFooter>
            <Button className="w-full bg-green-500" type="submit">Add Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

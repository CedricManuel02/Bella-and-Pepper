import React from "react"
import { Download } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader,DialogTitle, DialogTrigger} from "@/components/ui/dialog";

export default function ProductExportDialog() {
  return (
       <Dialog>
       <DialogTrigger asChild>
         <Button className="flex items-center gap-2 justify-center text-slate-500" variant={"outline"}>
           <Download size={20} />
           Export
         </Button>
       </DialogTrigger>
       <DialogContent className="sm:max-w-[485px]">
         <DialogHeader>
           <DialogTitle>Export Files</DialogTitle>
           <DialogDescription>
             Generate a file reports (e.g PDF, Excel)
           </DialogDescription>
         </DialogHeader>
         <div className="flex items-center gap-2">
           <div className="grid w-full items-center gap-1.5">
             <Label htmlFor="file_name" className="text-slate-700">
               File name
             </Label>
             <Input
               type="text"
               id="file_name"
               placeholder="Default (Date generated)"
             />
           </div>
           <div className="grid w-full items-center gap-1.5">
             <Label htmlFor="file_name" className="text-slate-700">
               File type
             </Label>
             <Select>
               <SelectTrigger>
                 <SelectValue placeholder="File type" />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="Excel">Excel</SelectItem>
                 <SelectItem value="PDF">PDF</SelectItem>
               </SelectContent>
             </Select>
           </div>
         </div>
         <DialogFooter>
           <Button className="w-full bg-green-500 hover:bg-green-600" type="submit">
             Generate
           </Button>
         </DialogFooter>
       </DialogContent>
     </Dialog>
  )
}

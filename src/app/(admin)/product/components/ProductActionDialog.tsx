import React from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface ProductActionDialogInterface {
    action: (id: string) => void;
    open: boolean;
    isOpen: (state: boolean) => void;
    id: string;
    title: string;
    description: string;
}
export default function ProductActionDialog({ open, isOpen, action, id, title, description } : ProductActionDialogInterface) {
    return (
        <AlertDialog open={open} onOpenChange={isOpen}>
            <AlertDialogTrigger asChild>
                <Button variant={"link"} className="text-slate-500 font-medium hover:underline">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => action(id)}>Yes, {title}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

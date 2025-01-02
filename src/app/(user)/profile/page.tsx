"use client"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input";
import React from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button";
import ProfileSidebar from "@/app/components/shared/ProfileSidebar"


const formProfileSchema = z.object({
  user_name: z.string().min(1, { message: "Name is required" }),
  user_profile: z.string().min(1, { message: "Profile is required" }),
  user_email: z.string().email().min(1, { message: "Email is required" }),
  user_phone: z.string().min(1, { message: "Phone is required" }).regex(/^9\d{8}$/, { message: "Phone number must start with 9 and be followed by 8 digits" })
    .length(9, { message: "Phone number must be 9 digits long" }),
})


export default function Profile() {
  const form = useForm<z.infer<typeof formProfileSchema>>({
    resolver: zodResolver(formProfileSchema),
    defaultValues: {
      user_name: "",
      user_email: "",
      user_phone: "",
      user_profile: "",
    }
  });
  return (
    <div className="w-11/12 xl:w-9/12 flex justify-center min-h-screen h-auto m-auto py-10">
      <ProfileSidebar />
      {/* Profile Form Section */}
      <div className="px-8 w-8/12">
        <h2 className="py-4 text-slate-700 font-semibold text-md">Manage Profile</h2>
        <Form {...form}>
          <form>
           <div className="flex flex-grow space-x-2">
           <FormField
              control={form.control}
              name="user_name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-medium text-slate-700">Name</FormLabel>
                  <FormControl>
                    <Input type="text" id="user_name" placeholder="Enter your name"  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}

            />
             <FormField
              control={form.control}
              name="user_profile"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-medium text-slate-700">Profile</FormLabel>
                  <FormControl>
                    <Input type="file" id="user_profile"  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}

            />
           </div>
            <FormField
              control={form.control}
              name="user_email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-medium text-slate-700">Email</FormLabel>
                  <FormControl>
                    <Input type="email" id="user_email" placeholder="Enter your email"  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="user_phone"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-medium text-slate-700">Phone</FormLabel>
                  <FormControl>
                    <div className="flex rounded-lg shadow-sm shadow-black/5">
                      <span className="-z-10 inline-flex items-center rounded-s-lg border border-input bg-background px-3 text-sm text-muted-foreground">
                        +63
                      </span>
                      <Input
                        className="-ms-px rounded-s-none shadow-none"
                        placeholder="Enter you phone"
                        type="tel"
                        pattern="^9\d{8}$"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          
            <div className="mt-6 flex items-center justify-end">
              <Button className="bg-green-500 hover:bg-green-600" type="submit">Update</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

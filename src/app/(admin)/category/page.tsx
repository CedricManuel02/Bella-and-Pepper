import React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import CategoryCreateModal from "@/app/(admin)/category/components/CategoryCreateModal";
import CategoryList from "@/app/(admin)/category/components/CategoryList";

export default function Category() {
    return (
        <div className="w-11/12 xl:w-9/12 min-h-screen h-auto m-auto py-10">
            <div className="py-4">
                <div className="flex justify-between flex-col items-start gap-2 lg:items-center lg:flex-row">
                    <div className="space-y-1">
                        <h2 className="text-slate-700 font-semibold text-md lg:text-xl">
                            Category
                        </h2>
                        <p className="text-slate-500 text-xs lg:text-sm">
                            Manage the shop categories.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <CategoryCreateModal/>
                    </div>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between flex-col items-start gap-2 md:flex-row">
                    <div className="flex h-5 items-center space-x-4 text-sm">
                        <Link className="text-slate-500 text-sm" href={"/category"}>
                            Categories
                        </Link>
                        <Separator orientation="vertical" />
                        <Link className="text-slate-500 text-sm" href={"/"}>
                            Archive
                        </Link>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        {/* Sort */}
                        <Input
                            className="w-full md:w-64"
                            type="text"
                            placeholder="Search..."
                        />
                        <Select>
                            <SelectTrigger className="w-full md:w-[150px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Name</SelectItem>
                                <SelectItem value="system">Date Added</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
            {/* Category Grid List */}
            <CategoryList/>
        </div>
    );
}

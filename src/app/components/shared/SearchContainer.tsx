"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

export default function SearchContainer() {
    const router = useRouter();
    const [search, setSearch] = useState<string>("");

    function handleKeyDown(event: any) {
        if (event.key === "Enter") {
            if (search !== "") {
                return router.push(`/search/${search}`);
            }
        }
    }
    const searchProduct = () => {
        if (search !== "") {
            return router.push(`/search/${search}`);
        }
    };
    return (
        <div className="hidden md:block w-5/12">
            <div className="flex items-center gap-2 w-full">
                <Input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleKeyDown}
                    required
                />
                <Button onClick={searchProduct} className="bg-green-500 hover:bg-green-600">
                    Search
                </Button>
            </div>
        </div>
    )
}

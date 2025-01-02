"use server"
import React from 'react'
import Image from "next/image";
import CategoryAction from './CategoryAction';
import { Card, CardContent } from "@/components/ui/card";
import CategoryActionButton from './CategoryActionButton';
import { CategoriesInterface } from '../../../../../typings';
import { getCategoryList } from '../../../../../actions/serverAction';

export default async function CategoryList() {
    const data = await getCategoryList();
    return (
        <div className="grid grid-cols-4 gap-2">
            {data.data.map((data : CategoriesInterface) => (
                <Card key={data.category_id} className="h-auto cursor-pointer shadow-xs border-slate-300">
                    <CardContent className="text-sm flex flex-col space-y-2 items-center justify-end p-4">
                        <Image
                            className="object-contain h-32 w-32"
                            src={`http://localhost:3001${data.category_image}`}
                            alt={data.category_name}
                            width={100}
                            height={100}
                            loading="lazy"
                        />
                        <h3 className="py-4 font-medium">{data.category_name}</h3>
                        {/* Category Section with Client Component Action Button */}
                        <CategoryAction>
                            <CategoryActionButton category_id={data.category_id}/>
                        </CategoryAction>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}





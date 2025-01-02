import { Star } from 'lucide-react';
import React from 'react'
interface RatingInterface {
    rating: number;
}
export default function StarRating({ rating }: RatingInterface) {
    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center justify-start">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index}>
                        {rating > index ?
                            (<Star key={index} fill="orange" size={14} strokeWidth={0} />) :
                            (
                                <Star key={index} fill="gray" size={14} strokeWidth={0} />
                            )
                        }
                    </div>
                ))}
            </div>
            <p className="text-slate-500 text-xs sm:text-sm font-medium">
                4.5
            </p>
        </div>
    )
}

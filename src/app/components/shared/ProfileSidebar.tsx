import React from "react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export default function ProfileSidebar() {
    return (
        <React.Fragment>
            <div className="px-8 w-3/12">
                <ul>
                    <li className="py-2">
                        <Link href="/profile" className="text-slate-500 text-sm hover:underline hover:text-slate-700">Profile</Link>
                    </li>
                    <li className="py-2">
                        <Link href="/change-password" className="text-slate-500 text-sm hover:underline hover:text-slate-700">Change Password</Link>
                    </li>
                    <li className="py-2">
                        <Link href="/purchase" className="text-slate-500 text-sm hover:underline hover:text-slate-700">My Purchase</Link>
                    </li>
                </ul>
            </div>
            <Separator orientation={"vertical"} className="h-96" />
        </React.Fragment>
    )
}

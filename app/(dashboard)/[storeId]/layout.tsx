import React from "react";
import DashBoardNavbar from "../_components/Navbar";
import { Separator } from "@/components/ui/separator";

export default function DashBoardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="container px-2 md:px-10 w-full">
            <DashBoardNavbar />
            <Separator />
            {children}
        </div>
    )
}
import NavBar from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default async function Rootlayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-full mx-auto">
            <NavBar />
            <Separator className="container mx-auto" />
            {children}
        </div>
    )
}
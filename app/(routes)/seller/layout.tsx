import NavBar from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import ModalProvider from "@/providers/modal-provider";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

export default async function SellerLayout({ children }: { children: React.ReactNode }) {
    const { userId } = auth()

    if (!userId) {
        redirect('/sign-in')
    }

    return (
        <div className="container w-full h-full mx-auto">
            <NavBar />
            <Separator />
            <ModalProvider />
            {children}
        </div>
    )
}
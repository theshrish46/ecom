import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

export default async function ({ children }: { children: React.ReactNode }) {
    const { userId } = await auth();

    console.log(userId)
    if (!userId) {
        redirect("/sign-in")
    }

    const store = await db.store.findFirst({
        where: {
            userId: userId
        }
    })
    console.log("store", store)
    const isAdmin = true

    if (isAdmin) {
        if (store) {
            redirect(`/${store.id}`)
        }
    }

    return (
        <div>
            {children}
        </div>
    )
}
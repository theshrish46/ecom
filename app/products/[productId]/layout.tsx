import React from "react";

export default async function ProductPageLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen flex justify-center items-center">
            {children}
        </div>
    )
}
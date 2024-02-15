import React from "react";

export default async function ProductPageLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-auto flex justify-center items-center">
            {children}
        </div>
    )
}
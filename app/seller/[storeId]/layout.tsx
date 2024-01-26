import React from "react";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-full mx-auto">
            {children}
        </div>
    )
}
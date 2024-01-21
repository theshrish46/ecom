import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-full w-full mx-auto flex justify-center items-center">
            {children}
        </div>
    )
}
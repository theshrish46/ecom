import React from "react";

import authbg from "@/public/auth-bg/auth-bg.jpg";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{ backgroundImage: `url(${authbg})` }}
      className="flex justify-center items-center h-screen w-full"
    >
      {children}
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/clerk-react";
import { auth } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  const role = auth()
  return (
    <main className="container">
      <div className="text-xl">
        Main Page
      </div>
    </main>
  );
}

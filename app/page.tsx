import Header from "@/components/header";
import MainPageProductCard from "@/components/main-page-product-card";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import Image from "next/image";

export default async function Home() {
  const products = await db.product.findMany({
    include: {
      images: true
    }
  })
  return (
    <main className="">
      <div className="container flex flex-col justify-center items-center space-y-4">
        <h2 className="text-5xl text-secondary-foreground">Welcome to the e-com</h2>
        <p className="text-xl text-primary">An e-commerce platform where your can buy and sell your products with the same account.</p>
      </div>

      <Separator className="my-4" />

      <div className="container grid grid-cols-3 gap-3">
        {
          products.map((product) => (
            <MainPageProductCard key={product.id} data={product} />
          ))
        }
      </div>

    </main>
  );
}

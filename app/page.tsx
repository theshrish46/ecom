import CategoryList from "@/components/CategoryList";
import ProductList from "@/components/ProductList";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { Product } from "@/types";
import Image from "next/image";

export default async function Home() {
  const products = await db.product.findMany({
    include: {
      images: true,
      category: true,
      ratings: true
    }
  })

  const billboard = await db.billboard.findMany()

  const category = await db.category.findMany()


  return (
    <main className="w-full">

      <section className="w-11/12 mx-auto rounded-xl my-2">
        <Carousel className="w-full">
          <CarouselContent>
            {
              billboard.map((item) => (
                <CarouselItem className="w-full h-auto" key={item.id}>
                  <div className="relative">
                    <h2 className="absolute bottom-16 left-6 text-2xl font-semibold">{item.name}</h2>
                    <Image src={item.imageUrl} alt="Image" width={1000} height={1000} className="w-full h-96 object-fill rounded-xl" />
                    <h4 className="absolute top-10 right-10">{ }</h4>
                  </div>
                </CarouselItem>
              ))
            }
          </CarouselContent>
        </Carousel>
      </section>

      <Separator className="my-4 w-11/12 mx-auto" />

      {/* TODO: Products List Based on Categories */}

      <section className="w-11/12 mx-auto my-2 flex gap-3">
        {
          category.map((item) => (
            <CategoryList data={item} key={item.id} />
          ))
        }
      </section>


      {/* TODO: Featured Products List */}

      <section className="w-11/12 mx-auto my-4 grid sm:grid-cols-7 gap-x-1">
        <h1 className="col-span-7 text-2xl font-medium my-2">Featured Products</h1>
        {
          products.map((item) => (
            <>
              {item.isFeatured === true && (
                <ProductList data={item} key={item.id} />
              )}
            </>
          ))
        }
      </section>


      <Separator className="my-4 w-11/12 mx-auto" />

      {
        products.map((item) => (
          <>
            {item.isArchived === true && (

              <section className="w-11/12 mx-auto my-4 grid sm:grid-cols-7 gap-x-3">
                <h1 className="text-2xl font-medium my-2 col-span-7">Recently Bought</h1>
                <p className="text-sm font-medium text-gray-700 col-span-7 my-2">Share your reviews here</p>
                {
                  products.map((item) => (
                    <>
                      {
                        item.isArchived === true && (
                          <ProductList data={item} key={item.id} />
                        )
                      }
                    </>
                  ))
                }
              </section>
            )}
          </>
        ))
      }



      {/* <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {
          products.map((product) => (
            <MainPageProductCard key={product.id} data={product} />
          ))
        }
      </div> */}

    </main>
  );
}

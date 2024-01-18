"use client";

import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/schemas";
import Header from '@/components/abstract-comps/header';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Category, Image, Product } from '@prisma/client';


interface AddProdcutProps {
    initialData?: Product & { images: Image[] } | null,
    category: Category[],
}


const AddProduct = ({
    category,
    initialData
}: AddProdcutProps) => {

    const form = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            productname: "",
            price: 0,
            categoryId: "",
            images: [],
            isArchive: false,
            isFeatured: false
        }
    })


    return (
        <div className='flex items-center justify-between'>
            <Header title='Add Product' description='Add a new product' />
            <div className='md:grid md:grid-cols-3 gap-8'>
                <Form {...form}>
                    <form>
                        <FormField
                            name='prodcutname'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prodcut Name</FormLabel>
                                    <FormDescription>Name of your product</FormDescription>
                                    <FormControl>
                                        <Input {...field} placeholder='e.g Java Notes' />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            name='price'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormDescription>Enter a suitable price</FormDescription>
                                    <FormControl>
                                        <Input {...field} placeholder='e.g $5' type='number' />
                                    </FormControl>
                                </FormItem>
                            )}
                        />


                    </form>
                </Form>
            </div>
        </div>
    );
}

export default AddProduct;
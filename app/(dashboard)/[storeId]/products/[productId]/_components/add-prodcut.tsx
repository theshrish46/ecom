"use client";

import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/schemas";
import Header from '@/components/abstract-comps/header';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Category, Image, Product } from '@prisma/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


interface AddProdcutProps {
    initialData?: Product & { images: Image[] } | null,
    categorys: Category[],
}


const AddProduct = ({
    categorys,
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
        <div>
            <Header title='Add Product' description='Add a new product' />



            <div>
                <Form {...form}>
                    <form>
                        <div className='md:grid md:grid-cols-3 gap-x-5'>

                            <FormField
                                name='productname'
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

                            <FormField
                                name='categoryId'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <FormDescription>Select a category</FormDescription>
                                        <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value} placeholder="Select a category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {categorys.map((category) => (
                                                    <SelectItem key={category.id} value={category.id}>{category.categoryname}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                        </div>

                    </form>
                </Form>
            </div>
        </div>
    );
}

export default AddProduct;
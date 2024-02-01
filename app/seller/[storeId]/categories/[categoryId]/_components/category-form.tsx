"use client";

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'


import Header from "@/components/header";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { categorySchema } from '@/schema';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { Billboard, Category } from '@prisma/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CategoryFormProps {
    initialData?: Category | null,
    billboards: Billboard[]
}


const CategoryForm = ({
    initialData,
    billboards
}: CategoryFormProps) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const params = useParams()

    const form = useForm<z.infer<typeof categorySchema>>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: initialData ? initialData.name : "",
            billboardId: initialData ? initialData.billboardId : ""
        }
    })

    const onSubmit = async (values: z.infer<typeof categorySchema>) => {
        console.log(values)
        try {
            if (initialData) {
                const response = await axios.patch(`/api/store/${params.storeId}/category/${params.categoryId}`, values)
            } else {
                const response = await axios.post(`/api/store/${params.storeId}/category`, values)
            }

            toast.success("Successfully created the billboard")
            router.refresh()
            router.push(`/seller/${params.storeId}/categories`)

        } catch (error) {
            console.log("Something went wrong while creating the billboard")
            toast.error("Something went wroong while creating the billboard")
        }
    }





    return (
        <div className='flex flex-col space-y-10'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='flex flex-col justify-start items-start gap-y-5'>

                        <div className='md:grid md:grid-cols-3 md:gap-10'>
                            <FormField
                                name='name'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Label</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder='e.g NotePlace' disabled={loading} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name='billboardId'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Billboard</FormLabel>
                                        <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {billboards.map((item) => (
                                                    <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button type='submit'>
                            Submit
                        </Button>
                    </div>


                </form>
            </Form>
        </div>
    );
}

export default CategoryForm
"use client";

import * as z from 'zod';

import { useState } from "react";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Billboards, Category } from "@prisma/client";
import { useForm } from "react-hook-form";
import { categorySchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SelectContent, SelectItem } from '@radix-ui/react-select';


interface CategoryFormProps {
    categories: Category[],
    billboards: Billboards[]
}

const CategoryForm = ({
    categories,
    billboards
}: CategoryFormProps) => {

    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof categorySchema>>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            categoryname: "",
            billboardId: "",
            storeId: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof categorySchema>) => {
        console.log(values)
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='spacy-y-8 w-full'>
                    <div className='md:grid md:grid-cols-3 gap-8'>
                        <FormField
                            name='categoryname'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} {...field} placeholder='e.g Notes' />
                                    </FormControl>
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
                                                <SelectValue defaultValue={field.value} placeholder="Select a billboard" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {billboards.map((billboard) => (
                                                <SelectItem key={billboard.id} value={billboard.id}>{billboard.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type='submit'>Save</Button>
                </form>
            </Form>
        </div>
    );
}

export default CategoryForm;
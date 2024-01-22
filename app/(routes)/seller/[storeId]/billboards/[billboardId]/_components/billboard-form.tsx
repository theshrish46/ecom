"use client";

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'


import Header from "@/components/header";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { billboardSchema } from '@/schema';
import { Input } from '@/components/ui/input';
import ImageUploader from '@/components/ui/image-upload';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import axios from 'axios';
import { useParams } from 'next/navigation';

const BillboardForm = () => {
    const [loading, setLoading] = useState(false);
    const params = useParams()

    const form = useForm<z.infer<typeof billboardSchema>>({
        resolver: zodResolver(billboardSchema),
        defaultValues: {
            label: "",
            imageUrl: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof billboardSchema>) => {
        console.log(values)
        try {

            const response = await axios.post(`/api/store/${params.storeId}/billboard`, values)

            const { data } = await response
            console.log(data)
            toast.success("Successfully created the billboard")

        } catch (error) {
            console.log("Something went wrong while creating the billboard")
            toast.error("Something went wroong while creating the billboard")
        }
    }





    return (
        <div>
            <Header title="Add Billboard" description="Add and manage your billboards" />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='flex flex-col justify-start items-start gap-y-5'>

                        <div className='md:grid md:grid-cols-3'>
                            <FormField
                                name='label'
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

                        </div>
                        <FormField
                            name='imageUrl'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image</FormLabel>
                                    <FormControl>
                                        <ImageUploader
                                            disabled={loading}
                                            value={field.value ? [field.value] : []}
                                            onChange={(url) => field.onChange(url)}
                                            onRemove={() => field.onChange("")}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <Button type='submit'>
                            Submit
                        </Button>
                    </div>


                </form>
            </Form>
        </div>
    );
}

export default BillboardForm;
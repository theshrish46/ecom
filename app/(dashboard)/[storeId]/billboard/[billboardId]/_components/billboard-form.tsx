"use client";

import * as z from 'zod';
import { useForm } from "react-hook-form";
import { billboardSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import ImageUpload from '@/components/ui/image-upload';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';


const BillboardForm = () => {
    const params = useParams()
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof billboardSchema>>({
        resolver: zodResolver(billboardSchema),
        defaultValues: {
            label: "",
            imageUrl: ""
        }
    })
    const onSubmit = async (values: z.infer<typeof billboardSchema>) => {
        console.log('inside the api call')
        console.log(values)
        try {
            setLoading(true)
            const response = await axios.post(`/api/${params.storeId}/billboard`, values)
            const { data } = await response
            toast.success("Successfully created billboard")
            router.push(`/${params.storeId}/billboard`)

        } catch (error) {
            toast.error("Something went wrong")
            console.log("error", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
                    <div className='flex flex-col justify-start items-start space-y-5'>
                        <div className='md:grid md:grid-cols-3 gap-8'>
                            <FormField
                                name='label'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} {...field} placeholder='e.g Notes Billboards' />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            name='imageUrl'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Background Image</FormLabel>
                                    <FormControl>
                                        <ImageUpload
                                            disabled={loading}
                                            value={field.value ? [field.value] : []}
                                            onChange={(url) => field.onChange(url)}
                                            onRemove={() => field.onChange('')}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                    <Button type='submit' disabled={loading}>Create Billboard</Button>
                </form>
            </Form>
        </div>
    );
}

export default BillboardForm;
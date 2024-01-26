"use client";

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


import { useState } from "react";
import { useRouter, useParams, redirect } from "next/navigation";
import Header from '@/components/header';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { storeSchema } from '@/schema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';

const StoreForm = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof storeSchema>>({
        resolver: zodResolver(storeSchema),
        defaultValues: {
            storename: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof storeSchema>) => {
        console.log(values)
        try {
            setLoading(true)
            console.log('above the response')
            const response = await axios.post('/api/store', values)
            console.log(response.data)
            router.refresh()
            router.push(response.data.id)
            // window.location.assign(response.data.id)

        } catch (error) {
            console.log('[STORE POST ERROR]', error)
        } finally {
            setLoading(false)
        }

    }

    return (
        <div className='my-10'>
            <Header title='Add Store' description='Add and Edit your stores' />
            <div className='flex'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className='flex flex-col space-y-5'>

                            <FormField
                                name='storename'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Store Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder='e.g Pheoix' {...field} disabled={loading} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button
                                variant={'outline'}
                                type='submit'
                            >
                                Add
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default StoreForm;

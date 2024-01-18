"use client"

import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

import { useStoreModal } from "@/hooks/use-store-modal";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import Modal from "../ui/modal";

import { storeSchema } from "@/schemas";
import { Input } from '../ui/input';
import { useState } from 'react';
import { Button } from '../ui/button';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const StoreModal = () => {
    const storeModal = useStoreModal()
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
            const response = await axios.post('/api/stores', values)
            const { data } = await response;
            toast.success("Store created successfully!")
            console.log(data)
            router.push(`/${data.id}`)
        } catch (error) {
            toast.error("Error while creating Store")
            console.log("error", error)
        } finally {
            setLoading(false)
        }
    }


    return (
        <Modal
            header="Create a store"
            description="Add a store and manage your products"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        name='storename'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Store Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='e.g Digital Notes'
                                        disabled={loading}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div className='pt-6 flex justify-end items-center space-x-5'>

                        <Button onClick={storeModal.onClose} variant={'destructive'} disabled={loading}>
                            Cancel
                        </Button>

                        <Button type='submit' variant={'outline'} disabled={loading}>
                            Continue
                        </Button>
                    </div>
                </form>
            </Form>

        </Modal >
    );
}

export default StoreModal;
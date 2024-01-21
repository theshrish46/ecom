"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios';

import Modal from "../ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { storeSchema } from "@/schema";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useToast } from "../ui/use-toast";

const StoreModal = () => {
    const storeModal = useStoreModal()
    const rotuer = useRouter()
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof storeSchema>>({
        resolver: zodResolver(storeSchema),
        defaultValues: {
            storename: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof storeSchema>) => {
        console.log(values)
        try {
            setLoading(true)

            const response = await axios.post('/api/store', values)
            toast.success("Created store successfully")
            window.location.assign(`/seller/${response.data.id}`)

        } catch (error) {
            toast.error("Something went wrong while creating the store")
        } finally {
            setLoading(false)
        }
    }


    return (
        <Modal title="Create Store" description="Add new store and sell assets." isOpen={storeModal.isOpen} onClose={storeModal.onClose}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        name="storename"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Store Name</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={loading} placeholder="e.g Digitio" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-end items-center pt-6 space-x-3">
                        <Button variant={'destructive'} size={'sm'} onClick={storeModal.onClose}>
                            Cancel
                        </Button>
                        <Button variant={'secondary'} size={'sm'}>
                            Continue
                        </Button>
                    </div>
                </form>
            </Form>
        </Modal>
    );
}

export default StoreModal;
"use client";

import * as z from 'zod';
import { useForm } from "react-hook-form";
import { billboardSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import ImageUploader from '@/components/ui/image-upload';


const BillboardForm = () => {
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof billboardSchema>>({
        resolver: zodResolver(billboardSchema),
        defaultValues: {
            label: "",
            imageUrl: ""
        }
    })
    return (
        <div>
            <Form {...form}>
                <form>
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
                        <FormField
                            name='imageUrl'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Background Image</FormLabel>
                                    <FormControl>
                                        <ImageUploader
                                            value={field.value ? [field.value] : []}
                                            disabled={loading}
                                            onChange={(url) => field.onChange(url)}
                                            onRemove={() => field.onChange('')}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default BillboardForm;
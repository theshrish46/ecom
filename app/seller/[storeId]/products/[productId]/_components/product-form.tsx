"use client";

import { useForm } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";


import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { productSchema } from "@/schema";
import { Category, Image, Product } from "@prisma/client";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/ui/image-upload";
import { UploadButton } from "@/utils/uploadthing";
import { UploadDropzone } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import FileUploader from "@/components/ui/file-uploader";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";


interface ProductFormProps {
    initialData?: Product & {
        images: Image[]
    } | null
    category: Category[]
}

const ProductForm = ({ category, initialData }: ProductFormProps) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const params = useParams()


    const form = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
        defaultValues: initialData ? {
            ...initialData,
            name: initialData.productname,
            price: parseFloat(String(initialData.price))
        } : {
            name: "",
            categoryId: "",
            description: "",
            images: [],
            isArchived: false,
            isFeatured: false,
            price: 0,
            productUrl: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof productSchema>) => {
        console.log(values)
        try {
            if (initialData) {
                const response = await axios.patch(`/api/store/${params.storeId}/product/${params.productId}`, values)
            } else {
                console.log('entered the post api route ')
                const response = await axios.post(`/api/store/${params.storeId}/product`, values)
            }

            router.refresh()
            router.push(`/seller/${params.storeId}/products`)

        } catch (error) {
            console.log('[API ERROR]', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Form {...form}>
                <form className="space-y-8 w-full" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="md:grid md:grid-cols-3 md:gap-10">

                        <FormField
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="e.g JavaScript Notes" disabled={loading} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="price"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} placeholder="e.g $5" disabled={loading} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="categoryId"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select onValueChange={field.onChange} disabled={loading} value={field.value} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} placeholder="e.g Select a category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {category.map((item) => (
                                                <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="description"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} placeholder="Enter description" disabled={loading} className="resize-none" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div>
                        <FormField
                            name="images"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Images</FormLabel>
                                    <FormControl>
                                        <ImageUploader
                                            value={field.value.map((image) => image.url)}
                                            disabled={loading}
                                            onChange={(url) => field.onChange([...field.value, { url }])}
                                            onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div>
                        <FormField
                            name="productUrl"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Products</FormLabel>
                                    <FormControl>
                                        <FileUploader
                                            endpoint="pdfUploader"
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="md:grid md:grid-cols-3 md:gap-10">
                        <FormField
                            name="isFeatured"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Featured</FormLabel>
                                        <FormDescription>This product will be featured on main page</FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="isArchived"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Archived</FormLabel>
                                        <FormDescription>This product will be archived</FormDescription>

                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit">
                        {initialData ? "Update" : "Create"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export default ProductForm;
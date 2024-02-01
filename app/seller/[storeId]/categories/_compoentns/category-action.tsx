"use client";

import AlertModal from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CopyIcon, HamburgerMenuIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { CategoryColumn } from "./columns";
import { useState } from "react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

interface CategoryActionProps {
    data: CategoryColumn
}

const CategoryAction = ({
    data
}: CategoryActionProps) => {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const params = useParams()

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id)
        toast.success("Id copied to clipboard")
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/store/${params.storeId}/category/${data.id}`)
            toast.success("Deleted successfully")
            router.refresh()
            setOpen(false)
            router.push(`/seller/${params.storeId}/categories`)
        } catch (error) {
            toast.error("Category Deleted successfully")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                loading={loading}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button disabled={loading} variant={'outline'}>
                        <HamburgerMenuIcon />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>

                    <DropdownMenuItem
                        disabled={loading}
                        onClick={() => onCopy(data.id)}
                        className="flex space-x-3"
                    >
                        <CopyIcon />
                        <span>Copy Id</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        disabled={loading}
                        onClick={() => router.push(`/seller/${params.storeId}/categories/${data.id}`)}
                        className="flex space-x-3"
                    >
                        <Pencil1Icon />
                        <span>Edit</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        disabled={loading}
                        onClick={() => setOpen(true)}
                        className="flex space-x-3"
                    >
                        <TrashIcon />
                        <span>Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}

export default CategoryAction;
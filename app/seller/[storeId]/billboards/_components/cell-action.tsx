"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BillboardColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { CopyIcon, HamburgerMenuIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import AlertModal from "@/components/modal/alert-modal";
import axios from "axios";

interface CellActionProps {
    data: BillboardColumn;
}

const BillAction = ({
    data
}: CellActionProps) => {
    const router = useRouter()
    const params = useParams()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/store/${params.storeId}/billboard/${data.id}`)
            router.refresh()
            router.push(`/seller/${params.storeId}/billboards`)
        } catch (error) {
            toast.error("Something went wrong while deleting the billboard")
        } finally {
            setLoading(false)
        }
    }

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id)
        toast.success("Id Copied")
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
                        <span className="sr-only">Open Menu</span>
                        <HamburgerMenuIcon />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>

                    <DropdownMenuItem
                        disabled={loading}
                        onClick={() => onCopy(data.id)}
                    >
                        <CopyIcon />Copy Id
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        disabled={loading}
                        onClick={() => router.push(`/seller/${params.storeId}/billboards/${data.id}`)}
                    >
                        <Pencil1Icon />Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        disabled={loading}
                        onClick={() => setOpen(true)}
                    >
                        <TrashIcon />Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default BillAction;
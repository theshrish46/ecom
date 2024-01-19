"use client";

import { DropdownMenu, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSubContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BillboardColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "@/components/abstract-comps/alter-modal";
import { useState } from "react";
import axios from "axios";



interface CellActionTypes {
    data: BillboardColumn;
}

const CellAction = ({
    data
}: CellActionTypes) => {

    const params = useParams();
    const router = useRouter()

    const [isOpen, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id)
        toast.success("Billboard id copied to clipboard")
    }

    const onConfirm = async () => {
        try {
            console.log('entered the try')
            setLoading(true)
            console.log(params.storeId)
            console.log(data.id)
            const response = await axios.delete(`/api/${params.storeId}/billboards/${data.id}`)
            await console.log(response.data)
            toast.success("Deleted Billboard Successfully")
        } catch (error) {
            console.log("[BILLBOARD DELETE ERROR]", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <AlertModal
                isOpen={isOpen}
                loading={loading}
                onClose={() => setOpen(false)}
                onConfirm={onConfirm}
            />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant={'ghost'}
                        className="p-0 h-8 w-8"
                    >
                        <span className="sr-only">Open Menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end"
                    className="bg-white z-50 px-3 py-2 shadow-lg"
                >
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        className=""
                        onClick={() => onCopy(data.id)}
                    >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={() => router.push(`/${params.storeId}/billboard/${data.id}`)}
                    >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export default CellAction
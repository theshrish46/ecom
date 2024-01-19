"use client";

import { useEffect, useState } from "react";

import Modal from "@/components/ui/modal"
import { Button } from "../ui/button";

interface AlertModalProps {
    isOpen: boolean,
    onConfirm: () => void,
    onClose: () => void,
    loading: boolean,
}

const AlertModal = ({
    isOpen,
    onConfirm,
    onClose,
    loading
}: AlertModalProps) => {

    const [isMounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])


    if (!isMounted) {
        return null
    }
    return (
        <Modal
            header="Are you sure?"
            description="Items once deleted cannot retrived"
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button disabled={loading} variant={'outline'} onClick={onClose}>
                    Cancel
                </Button>
                <Button disabled={loading} variant={'destructive'} onClick={onConfirm}>
                    Continue
                </Button>
            </div>
        </Modal>
    );
}

export default AlertModal;
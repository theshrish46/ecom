"use client";

import { useEffect, useState } from "react";
import Modal from "../ui/modal";
import { Button } from "../ui/button";

interface AlertModalProps {
    isOpen: boolean,
    onClose: () => void,
    onConfirm: () => void,
    loading: boolean
}

const AlertModal = ({
    isOpen,
    loading,
    onConfirm,
    onClose
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
            title="Are you sure?"
            description="This action cannot be undone."
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button disabled={loading} onClick={onClose} variant={'outline'}>
                    Cancel
                </Button>
                <Button onClick={onConfirm} disabled={loading} variant={'destructive'}>
                    Continue
                </Button>
            </div>
        </Modal>
    );
}

export default AlertModal;
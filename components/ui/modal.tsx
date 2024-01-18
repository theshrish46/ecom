'use client';
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./dialog";


interface ModalProps {
    header: string,
    description: string,
    children?: React.ReactNode,
    isOpen: boolean,
    onClose: () => void
}

const Modal = ({ header, description, children, isOpen, onClose }: ModalProps) => {

    const onChange = (open: boolean) => {
        if (!open) {
            onClose()
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{header}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div>
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default Modal;
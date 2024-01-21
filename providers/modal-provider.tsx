"use client";

import StoreModal from "@/components/modal/store-modal";
import { useEffect, useState } from "react";


const ModalProvider = () => {
    const [isMounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    return (
        <StoreModal />
    );
}

export default ModalProvider;
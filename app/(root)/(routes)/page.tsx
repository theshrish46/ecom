"use client";
import { useStoreModal } from "@/hooks/use-store-modal";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect } from "react";

const HomePage = () => {
  const isOpen = useStoreModal((state) => state.isOpen)
  const onOpen = useStoreModal((state) => state.onOpen)

  const isAdmin = true

  isAdmin &&
    useEffect(() => {

      if (!isOpen) {
        onOpen()
      }

    }, [isOpen, onOpen])
  return (
    <div>
      Main User Page
    </div>
  )
}

export default HomePage;
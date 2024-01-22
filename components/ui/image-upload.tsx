"use client";

import { CldUploadWidget } from 'next-cloudinary'

import { useEffect, useState } from "react";
import { Button } from "./button";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import Image from "next/image";

interface ImageUploaderProps {
    disabled?: boolean,
    onChange: (value: string) => void,
    onRemove: (value: string) => void,
    value: string[]
}

const ImageUploader = ({
    disabled,
    onChange,
    onRemove,
    value
}: ImageUploaderProps) => {
    const [isMounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
    }, [])

    const onUpload = (result: any) => {
        onChange(result.info.secure_url);
    }

    if (!isMounted) {
        return null;
    }

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value.map((url) => (
                    <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                        <div className="z-10 absolute top-2 right-2">
                            <Button variant={'destructive'}>
                                <TrashIcon className="w-4 h-4" />
                            </Button>
                        </div>
                        <Image
                            fill
                            className="object-cover"
                            alt="Image"
                            src={url}
                        />
                    </div>
                ))}
            </div>

            <CldUploadWidget onUpload={onUpload} uploadPreset="yxcz6kv1">
                {({ open }) => {
                    const onClick = () => {
                        open();
                    }

                    return (
                        <Button
                            variant='secondary'
                            type='button'
                            onClick={onClick}
                            disabled={disabled}
                        >
                            <PlusIcon className='w-4 h-4 mr-2' />
                            Upload an Image
                        </Button>
                    )
                }}
            </CldUploadWidget>
        </div>
    );
}

export default ImageUploader;
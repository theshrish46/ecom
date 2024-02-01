"use client";

import Image from "next/image";
import { Button } from "./button";
import { FileIcon, TrashIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { UploadDropzone } from "@/utils/uploadthing";
import { toast } from "sonner";

interface FileUploaderProps {
    onChange: (url?: string) => void,
    value: string,
    endpoint: "imageUploader" | "pdfUploader"
}

const FileUploader = ({ onChange, endpoint, value }: FileUploaderProps) => {
    const fileType = value?.split(".").pop()

    if (value && fileType !== 'pdf') {
        return (
            <div className="relative h-96 w-full">
                <Image
                    src={value}
                    alt="Upload"
                    fill={true}
                    className="rounded-md h-72 w-72 border-2 border-red-900"
                />
                <Button
                    type="button"
                    onClick={() => onChange("")}
                    variant={'destructive'}
                    className="absolute top-2 right-2"
                >
                    <TrashIcon />
                </Button>
            </div>
        )
    }

    if (value && fileType == 'pdf') {
        return (
            <div>
                <FileIcon />
                <Link href={value}>
                    {value}
                </Link>

                <Button
                    type="button"
                    onClick={() => onChange("")}
                >
                    Click
                </Button>
            </div>
        )
    }

    return (
        <UploadDropzone
            // className="h-52 w-64"
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url)
                toast.success("Successfully uploaded the assets")
            }}
            onUploadError={(error: Error) => {
                console.log(error)
                toast.error("Something went wrong wile uploading the assets")
            }}
        />
    )
}

export default FileUploader;
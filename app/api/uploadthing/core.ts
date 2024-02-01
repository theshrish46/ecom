import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = () => {
    const { userId } = auth()
    if (!userId) {
        throw new Error("Unauthorized")
    }
    return { userId }
}

export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 5 } })
        .middleware(() => handleAuth())
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Upload complete for userId:", metadata.userId);
            console.log("file url", file.url);
            return { uploadedBy: metadata.userId };
        }),
    pdfUploader: f({ pdf: { maxFileSize: "16MB", maxFileCount: 2 } })
        .middleware(() => handleAuth())
        .onUploadComplete(async ({ metadata, file }) => {
            console.log('Upload complete for userId:', metadata.userId);
            console.log("File Url", file.url)
        })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    return { userId };
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1}})
      .middleware(async () => await handleAuth()) 
      
      .onUploadComplete(({ file }) => { 
        
        console.log("✅ Course Image Uploaded:", file);
      }),

    courseAttachment: f(["text", "image", "video", "audio", "pdf"])
      .middleware(async () => await handleAuth()) 
      .onUploadComplete(({ file }) => { 
        console.log("✅ Course Attachment Uploaded:", file);
      }),

    chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" }})
      .middleware(async () => await handleAuth()) 
      .onUploadComplete(({ file }) => { 
        console.log("✅ Chapter Video Uploaded:", file);
      }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

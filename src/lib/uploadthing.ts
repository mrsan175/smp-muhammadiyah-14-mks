import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getCurrentUser } from "@/lib/auth";

const f = createUploadthing();

export const ourFileRouter = {
  kegiatanImageUploader: f({
    image: {
      maxFileSize: "512KB", // ~500KB
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const user = await getCurrentUser();
      if (!user || user.role !== "admin") {
        throw new Error("Unauthorized");
      }
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, url: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

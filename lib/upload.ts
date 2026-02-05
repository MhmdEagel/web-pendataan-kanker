import { CloudinaryUploadResult } from "@/types/Cloudinary";
import { cloudinary } from "./cloudinary";

type UploadSingleOptions = {
  folder?: string;
  publicId?: string;
  overwrite?: boolean;
};

type UploadMultipleOptions = {
  folder?: string;
  basePublicId?: string;
};

export async function uploadSingleImage(
  file: File,
  options?: UploadSingleOptions,
): Promise<CloudinaryUploadResult> {
  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: options?.folder,
          public_id: options?.publicId,
          overwrite: options?.overwrite ?? true,
          resource_type: "image",
        },
        (error, result) => {
          if (error || !result) return reject(error);

          resolve({
            public_id: result.public_id,
            secure_url: result.secure_url,
            width: result.width,
            height: result.height,
            format: result.format,
            filename: file.name
          });
        },
      )
      .end(buffer);
  });
}

export async function uploadMultipleImages(
  files: File[],
  options?: UploadMultipleOptions,
): Promise<CloudinaryUploadResult[]> {
  return Promise.all(
    files.map(async (file, index) => {
      const buffer = Buffer.from(await file.arrayBuffer());

      return new Promise<CloudinaryUploadResult>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: options?.folder,
              public_id: options?.basePublicId
                ? `${options.basePublicId}-${index + 1}`
                : undefined,
              resource_type: "image",
            },
            (error, result) => {
              if (error || !result) return reject(error);

              resolve({
                public_id: result.public_id,
                secure_url: result.secure_url,
                width: result.width,
                height: result.height,
                format: result.format,
                filename: file.name,
              });
            },
          )
          .end(buffer);
      });
    }),
  );
}

export async function deleteMultipleImages(
  publicIds: string[]
): Promise<void> {
  await Promise.all(
    publicIds.map(async (publicId) => {
      const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: "image",
      });

      if (result.result !== "ok" && result.result !== "not found") {
        throw new Error(`Failed to delete image: ${publicId}`);
      }
    })
  );
}

export async function deleteSingleImage(
  publicId: string
): Promise<void> {
  const result = await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
  });

  if (result.result !== "ok" && result.result !== "not found") {
    throw new Error(`Failed to delete image: ${publicId}`);
  }
}
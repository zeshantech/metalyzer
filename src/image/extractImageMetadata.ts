import { getFileExtension } from "../utils/getFileExtension";

export interface ImageMetadata {
  fileName: string;
  fileType: string;
  fileSizeKB: number;
  imageWidth?: number;
  imageHeight?: number;
  lastModified?: Date;
  lastModifiedDate?: Date;
  webkitRelativePath?: string;
  webkitEntry?: FileSystemEntry;
  mimeType: string;
  fileExtension: string;
}

export default function extractImageMetadata(imageFile: File): Promise<ImageMetadata> {
  return new Promise((resolve, reject) => {
    const image = document.createElement("img");

    image.addEventListener("load", () => {
      try {
        const fileSizeInKB = Math.ceil(imageFile.size / 1024);

        // Type assertions for webkitGetAsEntry

        const metadata: ImageMetadata = {
          fileName: imageFile.name,
          fileType: imageFile.type,
          fileSizeKB: fileSizeInKB,
          imageWidth: image.width,
          imageHeight: image.height,
          lastModified: imageFile.lastModified ? new Date(imageFile.lastModified) : undefined,
          webkitRelativePath: imageFile.webkitRelativePath,
          mimeType: imageFile.type, // Add MIME type
          fileExtension: getFileExtension(imageFile.name), // Add file extension
          // Add other properties accordingly
        };

        resolve(metadata);
      } catch (error) {
        reject(error);
      }
    });

    image.src = URL.createObjectURL(imageFile);
  });
}

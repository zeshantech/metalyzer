// src/index.ts

export interface VideoMetadata {
  fileName: string;
  fileType: string;
  fileSizeKB: number;
  videoWidth?: number;
  videoHeight?: number;
  videoDuration: number;
  lastModified?: Date;
  lastModifiedDate?: Date; // Legacy support
  webkitRelativePath?: string;
  webkitEntry?: FileSystemEntry;
  mimeType: string; // Add MIME type
  fileExtension: string; // Add file extension
  // Add any other properties you want to include
}

export function extractVideoMetadata(videoFile: File): Promise<VideoMetadata> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");

    video.preload = "metadata";
    video.addEventListener("loadedmetadata", () => {
      try {
        const fileSizeInKB = Math.ceil(videoFile.size / 1024);
        const videoDurationInSeconds = Math.ceil(video.duration);

        // Type assertions for webkitGetAsEntry

        const metadata: VideoMetadata = {
          fileName: videoFile.name,
          fileType: videoFile.type,
          fileSizeKB: fileSizeInKB,
          videoWidth: video.videoWidth,
          videoHeight: video.videoHeight,
          videoDuration: videoDurationInSeconds,
          lastModified: videoFile.lastModified
            ? new Date(videoFile.lastModified)
            : undefined,
          webkitRelativePath: videoFile.webkitRelativePath,
          mimeType: videoFile.type, // Add MIME type
          fileExtension: getFileExtension(videoFile.name), // Add file extension
          // Add other properties accordingly
        };

        resolve(metadata);
      } catch (error) {
        reject(error);
      }
    });

    video.src = URL.createObjectURL(videoFile);
  });
}

export function getFileExtension(fileName: string): string {
  const parts = fileName.split(".");
  return parts.length > 1 ? parts.pop()!.toLowerCase() : "";
}

// src/index.ts

import { getFileExtension } from "../utils/getFileExtension";

export type VideoMineType = "video/mp4" | "video/webm" | "video/avi" | "video/mpeg";

export interface VideoMetadata {
  fileName: string;
  fileType: string;
  fileSizeKB: number;
  videoWidth?: number;
  videoHeight?: number;
  videoDuration: number;
  lastModified?: Date;
  lastModifiedDate?: Date;
  webkitRelativePath?: string;
  webkitEntry?: FileSystemEntry;
  mimeType: VideoMineType;
  fileExtension: string;
}

export default function extractVideoMetadata(videoFile: File): Promise<VideoMetadata> {
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
          lastModified: videoFile.lastModified ? new Date(videoFile.lastModified) : undefined,
          webkitRelativePath: videoFile.webkitRelativePath,
          mimeType: videoFile.type as VideoMineType, // Add MIME type
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

import { getThumbnail } from "../utils/getThumbnail";
import extractVideoUrl from "./extractVideoUrl";

export default async function generateThumbnailsFromVideo(videoFile: File): Promise<[string, string]> {
  // Convert File to video URL
  const videoUrl = await extractVideoUrl(videoFile);

  // Create video element
  const video = document.createElement("video");
  video.src = videoUrl;

  // Wait for the video metadata to load
  video.load();

  // Get the duration of the video
  const duration = video.duration;

  // Calculate the time points for thumbnails
  const time1 = Math.min(duration / 3, duration - 1);
  const time2 = Math.min((2 * duration) / 3, duration - 1);

  // Get thumbnails using canvas
  const thumbnail1 = await getThumbnail(video, time1);
  const thumbnail2 = await getThumbnail(video, time2);

  // Clean up the video element
  video.src = "";
  video.load();

  return [thumbnail1, thumbnail2];
}

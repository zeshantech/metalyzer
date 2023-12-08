export default async function extractVideoUrl(videoFile: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");

    video.preload = "metadata";
    video.addEventListener("loadedmetadata", () => {
      try {
        const url = URL.createObjectURL(videoFile);
        resolve(url);
      } catch (error) {
        reject(error);
      }
    });

    video.src = URL.createObjectURL(videoFile);
  });
}

export default function extractThumbnailsFromVideo(file: File): Promise<string | null> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const video = document.createElement("video");

    // This is important
    video.autoplay = true;
    video.muted = true;
    video.src = URL.createObjectURL(file);

    video.onloadeddata = () => {
      const ctx = canvas.getContext("2d");

      if (ctx) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        video.pause();
        resolve(canvas.toDataURL("image/png"));
      } else {
        console.error("Error: Unable to get 2D context from canvas.");
        resolve(null);
      }
    };
  });
}

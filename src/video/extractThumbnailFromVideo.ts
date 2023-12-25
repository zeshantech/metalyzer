
export default function extractThumbnailFromVideo(file: File): Promise<File> {
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

        canvas.toBlob((blob) => {
          if (blob) {
            const thumbnailFile = new File([blob], "thumbnail.png", { type: "image/png" });
            resolve(thumbnailFile);
          } else {
            console.error("Error: Unable to convert canvas to Blob.");
            resolve(new File([""], "error-thumbnail.png", { type: "image/png" }));
          }
        }, "image/png");
      } else {
        console.error("Error: Unable to get 2D context from canvas.");
        resolve(new File([""], "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Aspect_ratio_-_16x9.svg/2560px-Aspect_ratio_-_16x9.svg.png", { type: "image/png" }));
      }
    };
  });
}

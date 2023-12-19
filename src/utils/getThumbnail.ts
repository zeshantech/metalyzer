export async function getThumbnail(video: HTMLVideoElement, time: number): Promise<string> {
  return new Promise((resolve) => {
    // Set the video time to capture the frame
    video.currentTime = time;

    // Create a canvas element to draw the frame
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d")!; // Non-null assertion

    // Set canvas dimensions to match video dimensions
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current frame onto the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to base64 data URL
    const thumbnailDataUrl = canvas.toDataURL("image/png");

    // Clean up the canvas
    canvas.remove();

    // Resolve with the thumbnail data URL
    resolve(thumbnailDataUrl);
  });
}

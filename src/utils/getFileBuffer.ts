export default async function fileToBuffer(file: File): Promise<Buffer> {
  try {
    if (!file || !file.arrayBuffer) {
      throw new Error("Invalid video file");
    }

    const arrayBuffer = await file.arrayBuffer();
    const bufferData = Buffer.from(arrayBuffer);
    return bufferData;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Error converting video to binary");
  }
}

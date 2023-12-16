export default function extractImageUrl(imageFile: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = document.createElement("img");

    image.addEventListener("load", () => {
      try {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = image.width;
        canvas.height = image.height;

        if (context) {
          context.drawImage(image, 0, 0, image.width, image.height);
          const imageUrl = canvas.toDataURL(imageFile.type);
          resolve(imageUrl);
        } else {
          reject(new Error("Canvas context is not supported."));
        }
      } catch (error) {
        reject(error);
      }
    });

    image.src = URL.createObjectURL(imageFile);
  });
}

export default function convertVideoInBlob(videoFile: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const blob = new Blob([arrayBuffer], { type: videoFile.type });
        resolve(blob);
      };
  
      reader.onerror = reject;
  
      reader.readAsArrayBuffer(videoFile);
    });
  }
  
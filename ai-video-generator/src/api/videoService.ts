// src/api/videoService.ts
export async function generateVideo(
  prompt: string,
  referenceImage: string,
  duration: number,
  resolution: number,
  audio: boolean
): Promise<{ videoUrl?: string; error?: string }> {
  try {
    // convert base64 or dataURL to Blob
    const response = await fetch(referenceImage);
    const blob = await response.blob();

    const formData = new FormData();
    formData.append("image", blob, "reference.png");
    formData.append("prompt", prompt);
    formData.append("duration", duration.toString());
    formData.append("resolution", resolution.toString());
    formData.append("audio", audio.toString());

    const res = await fetch("http://localhost:5000/api/generate-video", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Failed to generate video");
    }

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("Error generating video:", error);
    return { error: error.message || "Unknown error" };
  }
}

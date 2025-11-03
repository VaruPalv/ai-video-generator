import axios from "axios";

interface VideoGenerationData {
  prompt: string;
  duration?: number;
  resolution?: number;
  audio?: boolean;
  referenceImage?: string;
}

export const generateVideo = async (data: VideoGenerationData) => {
  try {
    // In a real case, you'd call your backend here.
    // For now, simulate a fake API response.
    const response = await axios.post("/api/video-generation/v1/videos", data);
    return response.data;
  } catch (error) {
    console.error("Video generation failed", error);
    throw error;
  }
};

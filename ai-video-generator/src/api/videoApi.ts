import axios from "axios";

export interface VideoGenerationRequest {
  model: string;
  referenceImage: string;
  duration: number;
  resolution: number;
  audio: boolean;
  prompt: string;
}

export interface Video {
  id: string;
  prompt: string;
  referenceImage: string;
  duration: number;
  resolution: number;
  audio: boolean;
  createdAt: string;
  modelName: string;
  sizeBytes: number;
  tags: string[];
  url: string;
  downloaded: boolean;
  bookmarked: boolean;
  projectVideo: boolean;
  verified: boolean;
  source: string;
  createdBy: string;
  edited: boolean;
  status: string;
}

export interface VideoGenerationResponse {
  videos: Video[];
}

export const generateVideo = async (
  request: VideoGenerationRequest
): Promise<VideoGenerationResponse> => {
  // Skip API call and go straight to mock for testing
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    videos: [
      {
        id: "generated-" + Date.now(),
        prompt: request.prompt,
        referenceImage: request.referenceImage,
        duration: request.duration,
        resolution: request.resolution,
        audio: request.audio,
        createdAt: new Date().toISOString(),
        modelName: request.model,
        sizeBytes: 1024000,
        tags: ["ai-generated", "custom"],
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        downloaded: false,
        bookmarked: false,
        projectVideo: false,
        verified: true,
        source: "ai-generator",
        createdBy: "user",
        edited: false,
        status: "Generated",
      },
    ],
  };
};

export const uploadImage = async (file: File): Promise<string> => {
  // Mock S3 upload – in real implementation, upload to S3 and return URL
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
};

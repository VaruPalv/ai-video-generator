const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.post("/api/video-generation/v1/videos", async (req, res) => {
  try {
    const { model, referenceImage, duration, resolution, audio, prompt } = req.body;
    if (!prompt || !referenceImage)
      return res.status(400).json({ error: "Missing prompt or referenceImage" });

    await new Promise((r) => setTimeout(r, 1000));

    // Choose dummy video by duration
    const sampleVideo =
      duration <= 4
        ? "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
        : "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

    res.json({
      videos: [
        {
          id: "dummy-" + Date.now(),
          prompt,
          referenceImage,
          duration,
          resolution,
          audio,
          createdAt: new Date().toISOString(),
          modelName: model,
          url: sampleVideo,
          status: "Generated",
        },
      ],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(5000, () => console.log("✅ Backend running on port 5000"));

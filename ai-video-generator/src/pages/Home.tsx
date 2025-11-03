import { useState } from "react";
import { Container, Typography, Box, Grid, Alert } from "@mui/material";
import ParameterForm, { type ModelParameters } from "../components/ParameterForm";
import PromptInput from "../components/PromptInput";
import VideoPreview from "../components/VideoPreview";
import { generateVideo, type Video } from "../api/videoApi";

export default function Home() {
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [parameters, setParameters] = useState<ModelParameters>({
    model: "Veo 3.1",
    duration: 6,
    resolution: 720,
    audio: true,
  });

  const [generatedVideo, setGeneratedVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (prompt: string) => {
    if (!referenceImage) {
      setError("Please upload a reference image first");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await generateVideo({
        ...parameters,
        referenceImage,
        prompt,
      });

      if (response.videos.length > 0) {
        setGeneratedVideo(response.videos[0]);
      }
    } catch (err) {
      setError("Failed to generate video. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Left Panel */}
          <Grid item xs={12} md={4} lg={3}>
            <Box
              sx={{
                backgroundColor: "#1A1A1A",
                p: 3,
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                gap: 3,
                position: "sticky",
                top: 24,
                height: 'fit-content',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              <ParameterForm
                onParametersChange={setParameters}
                onImageUpload={(url) => setReferenceImage(url)}
              />
            </Box>
          </Grid>

          {/* Right Panel */}
          <Grid item xs={12} md={8} lg={9}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {generatedVideo ? (
                <VideoPreview video={generatedVideo} />
              ) : (
                <Box
                  sx={{
                    backgroundColor: "#1A1A1A",
                    borderRadius: 2,
                    p: 4,
                    minHeight: 300,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Typography variant="body1" color="text.secondary">
                    Your generated video will appear here
                  </Typography>
                </Box>
              )}

              <Box
                sx={{
                  backgroundColor: "#1A1A1A",
                  borderRadius: 2,
                  p: 3,
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              >
                <PromptInput onGenerate={handleGenerate} loading={loading} />
              </Box>

              {loading && (
                <Box
                  sx={{
                    textAlign: "center",
                    mt: 4,
                    p: 4,
                    bgcolor: "#1A1A1A",
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    gutterBottom
                  >
                    Generating your video...
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    This may take a few moments
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

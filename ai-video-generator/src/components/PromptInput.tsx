import { Box, TextField, IconButton, CircularProgress } from "@mui/material";
import { Send } from "@mui/icons-material";
import { useState } from "react";

interface PromptInputProps {
  onGenerate: (prompt: string) => void;
  loading?: boolean;
}

export default function PromptInput({ onGenerate, loading = false }: PromptInputProps) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;
    onGenerate(prompt.trim());
  };

  return (
    <Box sx={{ position: "relative" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          multiline
          minRows={3}
          maxRows={5}
          placeholder="Type a prompt to generate a video e.g. A graceful ballerina dancing outside a circus tent on green grass, with colorful wildflowers swaying around her as she leaps and poses in the meadow"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={loading}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#2A2A2A",
              borderRadius: 2,
              "& fieldset": { border: "none" },
            },
            "& .MuiOutlinedInput-input": {
              color: "#fff",
              "&::placeholder": {
                color: "rgba(255,255,255,0.5)",
                opacity: 1,
              },
            },
          }}
          variant="outlined"
        />

        <IconButton
          type="submit"
          disabled={!prompt.trim() || loading}
          sx={{
            position: "absolute",
            right: 16,
            bottom: 16,
            bgcolor: "#4A90E2",
            width: 40,
            height: 40,
            color: "white",
            "&:hover": { 
              bgcolor: "#357ABD"
            },
            "&:disabled": { 
              bgcolor: "rgba(74, 144, 226, 0.3)",
              color: "rgba(255, 255, 255, 0.3)"
            },
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : <Send />}
        </IconButton>
      </form>
    </Box>
  );
}

import { Box, FormControlLabel, Switch, TextField, Typography, MenuItem, IconButton } from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useState, useRef } from "react";
import { uploadImage } from "../api/videoApi";

export interface ModelParameters {
  model: string;
  duration: number;
  resolution: number;
  audio: boolean;
}

interface ParameterFormProps {
  onParametersChange: (params: ModelParameters) => void;
  onImageUpload?: (imageUrl: string) => void;
}

export default function ParameterForm({ onParametersChange, onImageUpload }: ParameterFormProps) {
  const [model, setModel] = useState("Veo 3.1");
  const [duration, setDuration] = useState(6);
  const [resolution, setResolution] = useState(720);
  const [audio, setAudio] = useState(true);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateParameters = (updates: Partial<ModelParameters>) => {
    const newParams = { model, duration, resolution, audio, ...updates };
    onParametersChange(newParams);
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    setUploading(true);
    try {
      const imageUrl = await uploadImage(file);
      setPreview(imageUrl);
      onImageUpload?.(imageUrl);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = () => {
    setPreview(null);
    onImageUpload?.("");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Model Selection */}
      <Box>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 1, fontSize: "0.875rem" }}>
          Model *
        </Typography>
        <TextField
          fullWidth
          select
          value={model}
          onChange={(e) => {
            setModel(e.target.value);
            updateParameters({ model: e.target.value });
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#2A2A2A",
              borderRadius: 2,
              "& fieldset": { border: "none" },
            },
          }}
        >
          <MenuItem value="Veo 3.1">Veo 3.1</MenuItem>
          <MenuItem value="Veo 2.0">Veo 2.0</MenuItem>
        </TextField>
      </Box>

      {/* Reference Image */}
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", mb: 1, fontSize: "0.875rem" }}
      >
        Reference Image
      </Typography>
      {preview ? (
        <Box sx={{ position: "relative" }}>
          <Box
            sx={{
              width: "100%",
              height: 120,
              borderRadius: 2,
              overflow: "hidden",
              cursor: "pointer",
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <img
              src={preview}
              alt="Reference"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
          <IconButton
            onClick={handleDelete}
            sx={{
              position: "absolute",
              bottom: 8,
              left: 8,
              backgroundColor: "rgba(0,0,0,0.7)",
              color: "white",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
              width: 32,
              height: 32,
            }}
          >
            <Delete sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            height: 120,
            backgroundColor: "#2A2A2A",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            border: "2px dashed #444",
            "&:hover": { borderColor: "#666" },
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          <Typography sx={{ color: "text.secondary" }}>
            {uploading ? "Uploading..." : "Click to upload"}
          </Typography>
        </Box>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: "none" }}
        disabled={uploading}
      />

      {/* Duration */}
      <Box>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", mb: 1, fontSize: "0.875rem" }}
        >
          Duration *
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#2A2A2A",
            borderRadius: 1,
            width: "100%",
          }}
        >
          <IconButton
            onClick={() => {
              const newVal = Math.max(1, duration - 1);
              setDuration(newVal);
              updateParameters({ duration: newVal });
            }}
            sx={{
              color: "text.secondary",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
            }}
          >
            <Remove />
          </IconButton>
          <Box sx={{ flex: 1, textAlign: "center", py: 1 }}>
            <Typography variant="body2" sx={{ color: "text.primary" }}>
              {duration}s
            </Typography>
          </Box>
          <IconButton
            onClick={() => {
              const newVal = Math.min(30, duration + 1);
              setDuration(newVal);
              updateParameters({ duration: newVal });
            }}
            sx={{
              color: "text.secondary",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
            }}
          >
            <Add />
          </IconButton>
        </Box>
      </Box>

      {/* Resolution */}
      <Box>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", mb: 1, fontSize: "0.875rem" }}
        >
          Resolution *
        </Typography>
        <TextField
          fullWidth
          select
          value={resolution}
          onChange={(e) => {
            const val = Number(e.target.value);
            setResolution(val);
            updateParameters({ resolution: val });
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#2A2A2A",
              borderRadius: 2,
              "& fieldset": { border: "none" },
            },
          }}
        >
          <MenuItem value={480}>480p</MenuItem>
          <MenuItem value={720}>720p</MenuItem>
          <MenuItem value={1080}>1080p</MenuItem>
        </TextField>
      </Box>

      {/* Generate Audio */}
      <Box>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", mb: 1, fontSize: "0.875rem" }}
        >
          Generate Audio
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={audio}
              onChange={(e) => {
                setAudio(e.target.checked);
                updateParameters({ audio: e.target.checked });
              }}
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "#4A9EFF",
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#4A9EFF",
                },
              }}
            />
          }
          label=""
          sx={{ m: 0 }}
        />
      </Box>
    </Box>
  );
}

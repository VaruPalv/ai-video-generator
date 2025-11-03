import { Box, Typography, Avatar, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useState, useRef } from "react";
import { uploadImage } from "../api/videoApi";

interface UploadImageProps {
  onUpload: (imageUrl: string) => void;
}

export default function UploadImage({ onUpload }: UploadImageProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file!");
      return;
    }

    setUploading(true);
    try {
      const imageUrl = await uploadImage(file);
      setPreview(imageUrl);
      onUpload(imageUrl);
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = () => {
    setPreview(null);
    onUpload("");
  };

  return (
    <Box>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 1, fontSize: "0.875rem" }}>
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
              right: 8,
              bgcolor: "rgba(0,0,0,0.7)",
              color: "white",
              "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
              height: 32,
              width: 32,
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
            borderRadius: 2,
            border: "2px dashed #444",
            bgcolor: "#2A2A2A",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            color: "#666",
            "&:hover": { borderColor: "#666" },
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          <Typography variant="body2" color="text.secondary">
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
    </Box>
  );
}

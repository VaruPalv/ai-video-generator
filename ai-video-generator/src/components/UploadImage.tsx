import React, { useRef } from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  onUpload: (image: string | null) => void;
  image?: string | null;
};

export default function UploadImage({ onUpload, image }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => onUpload(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleDelete = () => onUpload(null);

  return (
    <div>
      {!image ? (
        <div className="upload-box" onClick={() => inputRef.current?.click()}>
          <p style={{ textAlign: "center", fontSize: "0.9rem", marginBottom: "10px" }}>
            Upload an image to guide video generation
          </p>
          <Button variant="contained" size="small">Choose Image</Button>
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleFile}
            style={{ display: "none" }}
          />
        </div>
      ) : (
        <div className="upload-preview">
          <img src={image} alt="Reference" />
          <button className="delete-btn" onClick={handleDelete}>
            <DeleteIcon fontSize="small" />
          </button>
        </div>
      )}
    </div>
  );
}

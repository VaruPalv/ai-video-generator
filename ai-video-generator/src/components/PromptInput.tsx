import React, { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

type Props = {
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
};

export default function PromptInput({ onGenerate, isLoading }: Props) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;
    onGenerate(text);
  };

  return (
    <div className="prompt-container">
      <input
        className="prompt-input"
        placeholder="Describe your video prompt..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isLoading}
      />
      <button
        className="prompt-button"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        <ArrowForwardIcon />
      </button>
    </div>
  );
}

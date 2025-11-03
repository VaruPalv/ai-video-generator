import React from "react";
import { Box, TextField, MenuItem, FormControlLabel, Switch } from "@mui/material";

export type ModelParams = {
  model: string;
  duration: number;
  resolution: number;
  audio: boolean;
};

type Props = {
  params: ModelParams;
  onChange: (p: ModelParams) => void;
};

const modelOptions = ["Veo 3.1", "Veo 2.0", "ToyMotion"];

export default function ParameterForm({ params, onChange }: Props) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        select
        label="Model"
        value={params.model}
        onChange={(e) => onChange({ ...params, model: e.target.value })}
        size="small"
        sx={{
        // input background/text
        "& .MuiOutlinedInput-root": {
          background: "#0f0f10", // dark but visible
          color: "#fff",
          borderRadius: 1,
          "&.Mui-focused": { boxShadow: "0 0 0 2px rgba(255,255,255,0.03)" }
        },
        // label color
        "& .MuiInputLabel-root": { color: "#bdbdbd" },
        // outline color
        "& .MuiOutlinedInput-notchedOutline": { borderColor: "#2f2f2f" },
        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#4a4a4a" },
        // select icon
        "& .MuiSvgIcon-root": { color: "#fff" },
        // reduce overall height a little if needed
        "& .MuiOutlinedInput-input": { padding: "8px 10px", fontSize: 13 }
      }}
      >
        {modelOptions.map((m) => (
          <MenuItem key={m} value={m}>
            {m}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Duration (s)"
        type="number"
        size="small"
        value={params.duration}
        onChange={(e) => onChange({ ...params, duration: Number(e.target.value) })}
        sx={{
        // input background/text
        "& .MuiOutlinedInput-root": {
          background: "#0f0f10", // dark but visible
          color: "#fff",
          borderRadius: 1,
          "&.Mui-focused": { boxShadow: "0 0 0 2px rgba(255,255,255,0.03)" }
        },
        // label color
        "& .MuiInputLabel-root": { color: "#bdbdbd" },
        // outline color
        "& .MuiOutlinedInput-notchedOutline": { borderColor: "#2f2f2f" },
        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#4a4a4a" },
        // select icon
        "& .MuiSvgIcon-root": { color: "#fff" },
        // reduce overall height a little if needed
        "& .MuiOutlinedInput-input": { padding: "8px 10px", fontSize: 13 }
      }}
      />

      <TextField
        select
        label="Resolution"
        value={params.resolution}
        onChange={(e) => onChange({ ...params, resolution: Number(e.target.value) })}
        size="small"
        sx={{
        // input background/text
        "& .MuiOutlinedInput-root": {
          background: "#0f0f10", // dark but visible
          color: "#fff",
          borderRadius: 1,
          "&.Mui-focused": { boxShadow: "0 0 0 2px rgba(255,255,255,0.03)" }
        },
        // label color
        "& .MuiInputLabel-root": { color: "#bdbdbd" },
        // outline color
        "& .MuiOutlinedInput-notchedOutline": { borderColor: "#2f2f2f" },
        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#4a4a4a" },
        // select icon
        "& .MuiSvgIcon-root": { color: "#fff" },
        // reduce overall height a little if needed
        "& .MuiOutlinedInput-input": { padding: "8px 10px", fontSize: 13 }
      }}
      >
        {[480, 720, 1080].map((r) => (
          <MenuItem key={r} value={r}>
            {r}p
          </MenuItem>
        ))}
      </TextField>

      <FormControlLabel
        control={
          <Switch
            checked={params.audio}
            onChange={(e) => onChange({ ...params, audio: e.target.checked })}
            size="small"
          />
        }
        label="Include audio"
      />
    </Box>
  );
}

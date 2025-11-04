# 🧠 AI Video Generator  

A responsive front-end web application built with **React, TypeScript, and Material UI** that simulates an AI-powered video generation interface.  

Users can upload a reference image, adjust model parameters, enter a text prompt, and generate mock AI videos. The project follows the design and flow from the **Front-end Hiring Assignment** brief.  

---

## 📸 Features  

✅ **AI Video Generator UI** — Matches the assignment’s Figma design and flow.  
✅ **Reference Image Upload** — Upload an image (mocked as Base64).  
✅ **Prompt Input** — Enter custom text prompts to generate AI videos.  
✅ **Parameter Controls** — Choose model, duration, resolution, and audio toggle.  
✅ **Responsive Layout** — Works smoothly on mobile, tablet, and desktop.  
✅ **Hover Interactions** — Video previews auto-play on hover with overlay tooltips.  
✅ **Routing** — Overlay modal uses `/video/:id` and back button navigates properly.  
✅ **Mock API Integration** — Generates a sample video via simulated backend.  

---

## 🏗️ Tech Stack  

| Category | Tools Used |
|-----------|-------------|
| Front-end | React, TypeScript |
| UI Library | Material UI (MUI v5) |
| Routing | React Router DOM v6 |
| Build Tool | Vite |
| Styling | MUI + CSS Modules |
| Language | TypeScript (ES2022) |

---

## 📂 Folder Structure  

AI-Video-Generator/
│
├── src/
│ ├── api/
│ │ └── videoApi.ts
│ ├── components/
│ │ ├── ParameterForm.tsx
│ │ ├── PromptInput.tsx
│ │ ├── UploadImage.tsx
│ │ ├── VideoPreview.tsx
│ │ └── LoadingSpinner.tsx
│ ├── pages/
│ │ ├── Home.tsx
│ │ └── VideoOverlay.tsx
│ ├── routes/
│ │ └── AppRouter.tsx
│ ├── hooks/
│ │ └── useResponsive.ts
│ ├── App.tsx
│ ├── main.tsx
│ ├── index.css
│ └── App.css
│
├── index.html
├── package.json
├── tsconfig.json
└── README.md


---

## ⚙️ Installation & Setup  

### 1️⃣ Clone or unzip  
```bash
git clone https://github.com/<your-username>/AI-Video-Generator.git
cd AI-Video-Generator
```
# or unzip AI_Project.zip and open the folder

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Start the development server
```bash
npm run dev
```

### 4️⃣ Build for production
```bash
npm run build
npm run preview
```
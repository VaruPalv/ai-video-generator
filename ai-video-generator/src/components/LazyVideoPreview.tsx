import { lazy, Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';
import type { Video } from '../api/videoApi';

const VideoPreview = lazy(() => import('./VideoPreview'));

interface Props {
  video: Video;
}

export default function LazyVideoPreview({ video }: Props) {
  return (
    <Suspense 
      fallback={
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            height: { xs: 300, sm: 400, md: 540 },
            bgcolor: '#1A1A1A',
            borderRadius: 1
          }}
        >
          <CircularProgress />
        </Box>
      }
    >
      <VideoPreview video={video} />
    </Suspense>
  );
}
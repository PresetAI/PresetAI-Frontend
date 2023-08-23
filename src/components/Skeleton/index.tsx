import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function SkeletonComponent() {
  return (
    <Box sx={{ width: '100%' }}>
      <Skeleton sx={{ width: '80%' }} />
      <Skeleton sx={{ width: '60%' }} animation="wave" />
      <Skeleton animation={false} />
      <Skeleton sx={{ width: '80%', marginTop: 1 }} />
      <Skeleton sx={{ width: '60%' }} animation="wave" />
      <Skeleton animation={false} />
      <Skeleton sx={{ width: '80%', marginTop: 1 }} />
      <Skeleton sx={{ width: '60%' }} animation="wave" />
      <Skeleton animation={false} />
    </Box>
  );
}

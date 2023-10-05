import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

type SkeletonProps = {
  mode: 'light' | 'dark';
};

export default function SkeletonComponent(props: SkeletonProps) {
  const { mode } = props;
  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Skeleton
        sx={{
          width: '80%',
          backgroundColor: `${
            mode === 'light'
              ? 'rgba(0, 0, 0, 0.11)'
              : 'rgba(255, 255, 255, 0.80)'
          }`,
        }}
      />
      <Skeleton
        sx={{
          width: '60%',
          backgroundColor: `${
            mode === 'light'
              ? 'rgba(0, 0, 0, 0.11)'
              : 'rgba(255, 255, 255, 0.80)'
          }`,
        }}
        animation="wave"
      />
      <Skeleton
        animation={false}
        sx={{
          backgroundColor: `${
            mode === 'light'
              ? 'rgba(0, 0, 0, 0.11)'
              : 'rgba(255, 255, 255, 0.80)'
          }`,
        }}
      />
      <Skeleton
        sx={{
          width: '80%',
          marginTop: 1,
          backgroundColor: `${
            mode === 'light'
              ? 'rgba(0, 0, 0, 0.11)'
              : 'rgba(255, 255, 255, 0.80)'
          }`,
        }}
      />
      <Skeleton
        sx={{
          width: '60%',
          backgroundColor: `${
            mode === 'light'
              ? 'rgba(0, 0, 0, 0.11)'
              : 'rgba(255, 255, 255, 0.80)'
          }`,
        }}
        animation="wave"
      />
      <Skeleton
        animation={false}
        sx={{
          backgroundColor: `${
            mode === 'light'
              ? 'rgba(0, 0, 0, 0.11)'
              : 'rgba(255, 255, 255, 0.80)'
          }`,
        }}
      />
      <Skeleton
        sx={{
          width: '80%',
          marginTop: 1,
          backgroundColor: `${
            mode === 'light'
              ? 'rgba(0, 0, 0, 0.11)'
              : 'rgba(255, 255, 255, 0.80)'
          }`,
        }}
      />
      <Skeleton
        sx={{
          width: '60%',
          backgroundColor: `${
            mode === 'light'
              ? 'rgba(0, 0, 0, 0.11)'
              : 'rgba(255, 255, 255, 0.80)'
          }`,
        }}
        animation="wave"
      />
      <Skeleton animation={false} />
    </Box>
  );
}

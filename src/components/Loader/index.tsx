import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

type Props = {
  open: boolean;
  title?: string;
};

export default function Loader(props: Props) {
  const { open, title } = props;

  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        display: 'flex',
        flexDirection: 'column',
        justifyItems: 'center',
        gap: 2,
      }}
      open={open}
    >
      <CircularProgress color="inherit" />
      <div>{title}</div>
    </Backdrop>
  );
}

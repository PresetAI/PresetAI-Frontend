import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from 'react-router-dom';

type Props = {
  path: string;
};

export default function BreadcrumbsComponent(props: Props) {
  const { path } = props;
  const breadcrumbs = [
    <Link to="/">PresetAI</Link>,
    <Link to="/projects">Projects</Link>,
    <Typography key="3" color="text.primary">
      {path}
    </Typography>,
  ];

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="large" />}
      aria-label="breadcrumb"
    >
      {breadcrumbs}
    </Breadcrumbs>
  );
}

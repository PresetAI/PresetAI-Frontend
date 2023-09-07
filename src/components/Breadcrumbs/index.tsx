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
    <Link to="/" className="text-muted-foreground">
      PresetAI
    </Link>,
    <Link to="/projects" className="text-muted-foreground">
      Projects
    </Link>,
    <Typography key="3" className="text-primary">
      {path}
    </Typography>,
  ];

  return (
    <Breadcrumbs
      separator={
        <NavigateNextIcon fontSize="large" className="text-muted-foreground" />
      }
      aria-label="breadcrumb"
    >
      {breadcrumbs}
    </Breadcrumbs>
  );
}

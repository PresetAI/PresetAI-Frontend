import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import moment from 'moment';

type ProjectItemProps = {
  item: API.Project;
};

function ProjectItem(props: ProjectItemProps) {
  const { item } = props;
  return (
    <Link to={`/project/playground/${item._id}`}>
      <Card sx={{ borderRadius: 2 }}>
        <CardActionArea>
          <CardContent
            sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}
          >
            <Typography gutterBottom variant="h5" component="div">
              {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <div className="flex justify-between">
                <div>ID: {item._id?.substring(0, 5)}</div>
                <div>{moment(item.create_time).format('YYYY-MM-DD')}</div>
              </div>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}

export default ProjectItem;

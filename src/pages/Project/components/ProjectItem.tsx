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
    <Link to={`/project/dashboard/${item.id}`}>
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <div>namespace: {item.namespace}</div>
              <div>topK: {item.top_k}</div>
              <div>commodityTable: {item.table_name}</div>
              <div>
                Create Time: {moment(item.create_time).format('YYYY-MM-DD')}
              </div>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}

export default ProjectItem;

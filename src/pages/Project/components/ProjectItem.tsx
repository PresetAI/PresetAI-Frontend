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
    <Link to={`/project/${item._id}`}>
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <div>namespace: {item.namespace}</div>
              <div>topK: {item.topK}</div>
              <div>commodityTable: {item.commodityTable}</div>
              <div>
                Create Time: {moment(item.createTime).format('YYYY-MM-DD')}
              </div>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}

export default ProjectItem;

import { Sidebar } from '../../layouts';
import ProjectList from './components/ProjectList';
import ProjectCreateDialog from '@/pages/Project/components/ProjectCreateDialog';
import { useState } from 'react';
import AlertDestructive from '@/components/Alert/AlertDestructive';
import { AlertDefault } from '@/components/Alert/AlertDefault';

const ProjectListData: API.Project[] = [
  {
    _id: '_id1',
    name: 'name1',
    namespace: 'namespace1',
    topK: 3,
    table_id: '23',
  },
  {
    _id: '_id2',
    name: 'name2',
    namespace: 'namespace2',
    topK: 4,
    table_id: '123',
  },
  {
    _id: '_id3',
    name: 'name3',
    namespace: 'namespace3',
    topK: 5,
    table_id: 'fd12',
  },
  {
    _id: '_id4',
    name: 'name4',
    namespace: 'namespace4',
    topK: 6,
    table_id: 'fe21',
  },
  {
    _id: '_id5',
    name: 'name5',
    namespace: 'namespace5',
    topK: 7,
    table_id: 'fe3',
  },
  {
    _id: '_id6',
    name: 'name6',
    namespace: 'namespace6',
    topK: 8,
    table_id: 'fewa123',
  },
];

function Project() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false); // dialog open or not
  const [alert, setAlert] = useState<null | 'default' | 'destructive'>(null);
  const [description, setDescription] = useState<string>('');
  return (
    <Sidebar
      component={
        <>
          {alert === 'destructive' && (
            <AlertDestructive description={description} />
          )}
          {alert === 'default' && <AlertDefault description={description} />}
          <ProjectCreateDialog
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            setAlert={setAlert}
            setDescription={setDescription}
          />
          <ProjectList ProjectListData={ProjectListData} />
        </>
      }
    />
  );
}

export default Project;

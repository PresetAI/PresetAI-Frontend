import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { grey } from '@mui/material/colors';
import { deleteMultipleFilesUsingDelete } from '@/services/ProjectController';
import localization from '@/config/localization';

interface Data {
  id: string;
  filename: string;
  provider: string;
  source_link: string;
  create_time: string;
}

function createData(
  id: string | undefined,
  filename: string | undefined,
  provider: string | undefined,
  source_link: string | undefined,
  create_time: string | undefined
): Data {
  return {
    id,
    filename,
    provider,
    source_link,
    create_time,
  } as Data;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'filename',
    numeric: false,
    disablePadding: false,
    label: 'Filename',
  },
  {
    id: 'source_link',
    numeric: false,
    disablePadding: false,
    label: 'Source link',
  },
  {
    id: 'provider',
    numeric: false,
    disablePadding: false,
    label: 'Provider',
  },
  {
    id: 'create_time',
    numeric: false,
    disablePadding: false,
    label: 'Create Time',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead sx={{ bgcolor: 'tranparent' }}>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="default"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all files',
            }}
            sx={{
              color: grey[700],
              '&.Mui-checked': {
                color: grey[900],
              },
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <span className="text-primary">{headCell.label}</span>

              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  setLocalizationAndLoadingFunction: (text: string, open: boolean) => void;
  projectId: string | undefined;
  getProjectFileByProjectId: () => void;
  numSelected: number;
  selectedDeleteIds: API.DeleteMultipleFilesUsingDeleteBody | undefined;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const {
    setLocalizationAndLoadingFunction,
    projectId,
    getProjectFileByProjectId,
    numSelected,
    selectedDeleteIds,
  } = props;

  const onClickDeleteSelected = async () => {
    setLocalizationAndLoadingFunction(localization.deleting, true);
    await deleteMultipleFilesUsingDelete(projectId || '', selectedDeleteIds);
    setLocalizationAndLoadingFunction(localization.empty, false);
    getProjectFileByProjectId();
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          <span className="text-primary">Data Sources</span>
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={onClickDeleteSelected}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

interface ProjectFileManagementTableProps {
  setLocalizationAndLoadingFunction: (text: string, open: boolean) => void;
  projectId: string | undefined;
  getProjectFileByProjectId: () => void;
  filteredFileList: API.ProjectFileList[];
  filename: string;
  setFilterText: (
    prev: any,
    options?: { replace: boolean }
  ) => void | Promise<void>;
}

function ProjectFileManagementTable(props: ProjectFileManagementTableProps) {
  const {
    setLocalizationAndLoadingFunction,
    projectId,
    getProjectFileByProjectId,
    filteredFileList,
    filename,
    setFilterText,
  } = props;
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('filename');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [selectedDeleteIds, setSelectedDeleteIds] =
    useState<API.DeleteMultipleFilesUsingDeleteBody>(); // Add selectedDeleteIds here
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [rows, setRows] = useState<Data[]>([]);
  const createRows = () => {
    const newRowData = filteredFileList.map((projectFile) =>
      createData(
        projectFile._id,
        projectFile.filename,
        projectFile.provider,
        projectFile.source_link,
        projectFile.create_time
      )
    );
    setRows(newRowData);
  };
  useEffect(() => {
    createRows();
  }, [filteredFileList]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];
    let newSelectedDeleteIds: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
      newSelectedDeleteIds = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      newSelectedDeleteIds = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      newSelectedDeleteIds = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
      newSelectedDeleteIds = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelectedDeleteIds({
      file_ids: newSelectedDeleteIds,
    });
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(() => {
    return stableSort(rows, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [order, orderBy, page, rows, rowsPerPage]); // Add rowsUpdated here

  return (
    <>
      <div className="flex justify-between py-4">
        <Input
          className="w-96"
          type="text"
          placeholder="Search by Filename"
          value={filename}
          onChange={(e) =>
            setFilterText(
              (prev: any) => {
                prev.set('filename', e.target.value);
                return prev;
              },
              { replace: true }
            )
          }
        />
        <Button className="text-sm font-semibold">Add New Data Sources</Button>
      </div>
      <Box sx={{ width: '100%', borderRadius: 4 }}>
        <Paper
          sx={{ width: '100%', mb: 2, bgcolor: 'transparent', borderRadius: 4 }}
        >
          <EnhancedTableToolbar
            setLocalizationAndLoadingFunction={
              setLocalizationAndLoadingFunction
            }
            projectId={projectId}
            getProjectFileByProjectId={getProjectFileByProjectId}
            numSelected={selected.length}
            selectedDeleteIds={selectedDeleteIds}
          />
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {visibleRows.map((row: any, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      onClick={(event) => handleClick(event, row.id)}
                      aria-checked={isItemSelected}
                      selected={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                          sx={{
                            color: grey[700],
                            '&.Mui-checked': {
                              color: grey[900],
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <span className="text-primary">{row.filename}</span>
                      </TableCell>
                      <TableCell align="left">
                        <a
                          href={row.source_link}
                          target="_blank"
                          rel="noreferrer"
                          className=" transition duration-150 hover:text-gray-400"
                        >
                          <Button>Link</Button>
                        </a>
                      </TableCell>
                      <TableCell align="left">
                        <span className="text-primary">{row.provider}</span>
                      </TableCell>
                      <TableCell align="left">
                        <span className="text-primary">
                          {moment(row.create_time).format('YYYY-MM-DD hh:mm a')}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  );
}

export default ProjectFileManagementTable;

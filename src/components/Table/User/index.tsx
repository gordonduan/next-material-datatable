import EnhancedTableHead from '../../Table/EnhancedTableHead'
import EnhancedTableToolbar from '../../Table/EnhancedTableToolbar'
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import UserForm from '../User/UserForm/UserForm';
import axios from 'axios';
import moment from 'moment';
import { NextUser } from '../../../repositories/user-repository';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

const headCells = [
  { id: 'name', align: 'center', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'email', align: 'center', numeric: false, disablePadding: true, label: 'Email' },
  { id: 'mobile', align: 'center', numeric: false, disablePadding: true, label: 'Mobile' },
  { id: 'city', align: 'center', numeric: false, disablePadding: true, label: 'City' },
  { id: 'gender', align: 'center', numeric: false, disablePadding: true, label: 'Gender' },
  { id: 'departmentId', align: 'center', numeric: false, disablePadding: true, label: 'Department' },
  { id: 'hireDate', align: 'center', numeric: false, disablePadding: true, label: 'Hire Date' },
  { id: 'isPermanent', align: 'center', numeric: false, disablePadding: true, label: 'Is Permanent' },
  // { id: 'createdAt', align: 'center', numeric: true, disablePadding: false, label: 'Created' },
  { id: 'action', align: 'center', numeric: true, disablePadding: true, label: 'Action' }
];

const UserTable = ({ rows }) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState<Partial<NextUser>>({});

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleAdd = async () => {
    setUser({
      id: 0,
      name: '',
      email: '',
      mobile: '',
      city: '',
      gender: 'male',
      departmentId: 0,
      hireDate: new Date(),
      isPermanent: false,
    });
    setOpen(true);
  };

  const handleEdit = async (id) => {
    let { data } = await axios.get(`/api/user/${id}`);
    if(data.status !== "ok") return; //show some error
    setUser({
      id: data.data.id,
      name: data.data.name,
      email: data.data.email,
      mobile: data.data.mobile,
      city: data.data.city,
      gender: data.data.gender,
      departmentId: data.data.departmentId,
      hireDate: data.data.hireDate,
      isPermanent: Boolean(data.data.isPermanent),
    })
    setOpen(true);
  };

  const handleDelete = async (id) => {
    let { data } = await axios.delete(`/api/user/${id}`);
    if(data.status !== "ok") return; //show some error
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (values) => {
    if (values.id ) {
      var { data } = await axios.put(`/api/user/${values.id}`,values);
    } else {
      var { data } = await axios.post(`/api/user`,values);
    }
    setOpen(false);
  }

  const departmentItems = [
    { id: '1', title: 'Development' },
    { id: '2', title: 'Marketing' },
    { id: '3', title: 'Accounting' },
    { id: '4', title: 'HR' },
  ];

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} onHandleAdd={handleAdd}/>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              headCells={headCells}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onClick={(event) => handleClick(event, row.name)}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell align="justify">{row.email}</TableCell>
                      <TableCell align="justify">{row.mobile}</TableCell>
                      <TableCell align="justify">{row.city}</TableCell>
                      <TableCell align="justify">{row.gender}</TableCell>
                      <TableCell align="justify">{(departmentItems.find( ({ id }) => id == row.departmentId )).title}</TableCell>
                      <TableCell align="justify">{moment(row.hireDate).format('YYYY-MM-DD')}</TableCell>
                      <TableCell align="justify">{row.isPermanent?("Yes"):("No")}</TableCell>
                      {/* <TableCell align="center">{moment(row.createAt).format('YYYY-MM-DD')}</TableCell> */}
                      <TableCell align="justify">
                        {<Tooltip title="Edit">
                          <IconButton aria-label="edit" onClick={() => handleEdit(row.id)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>}
                        {<Tooltip title="Delete">
                          <IconButton aria-label="delete" onClick={() => handleDelete(row.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={headCells.length+1} />
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
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />

      <UserForm
        open={open}
        onHandleSubmit={handleSubmit}
        onHandleClose={handleClose}
        user={user}
      />

    </div>
  )
}

export default UserTable;

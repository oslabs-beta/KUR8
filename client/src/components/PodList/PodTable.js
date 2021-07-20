import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 300,
    border: 'none',
  },
  tableHead: {
    width: '100%',
  },
  tableCell: {
    backgroundColor: theme.palette.grey[300],
    borderBottom: 'none',
  },
}));

const MyTableCell = withStyles({
  borderBottom: 'none',
})(TableCell);

export default function PodTable({ metadata, spec, status }) {
  const classes = useStyles();
  const statusRows = [];
  const specRows = [];
  const metadataRows = [];
  const rowHeads = [];

  const rowNames = ['metadata', 'spec', 'status'];
  const rowsArray = [metadataRows, specRows, statusRows];

  const makeHeads = strArray => {
    strArray.map(rowName =>
      rowHeads.push(
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell className={classes.tableCell}>
              {rowName.toUpperCase()}
            </TableCell>
          </TableRow>
        </TableHead>
      )
    );
  };

  const makeRows = (dataObj, rowArray) => {
    for (const [key, value] of Object.entries(dataObj)) {
      rowArray.push(
        <TableRow key={`table-row-${key}`}>
          <MyTableCell component="th" scope="row">
            {key}
          </MyTableCell>
          <TableCell align="left">{value}</TableCell>
        </TableRow>
      );
    }
    return;
  };

  makeHeads(rowNames);
  makeRows(metadata, metadataRows);
  makeRows(spec, specRows);
  makeRows(status, statusRows);

  console.log('spec', specRows);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        {rowsArray.map((rows, index) => {
          return (
            <>
              {rowHeads[index]}
              <TableBody>{rows}</TableBody>
            </>
          );
        })}
      </Table>
    </TableContainer>
  );
}

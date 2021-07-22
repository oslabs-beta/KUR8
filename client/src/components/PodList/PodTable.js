import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
  tableCellCatagory: {
    backgroundColor: theme.palette.grey[300],
  },
  tableCellItem: {
    borderBottom: 'none',
  },
}));

export default function PodTable({ metadata, spec, status }) {
  const classes = useStyles();
  const statusRows = [];
  const specRows = [];
  const metadataRows = [];
  const rowHeads = [];

  const rowNames = ['metadata', 'spec', 'status'];
  const rowsArray = [metadataRows, specRows, statusRows];

  // makeHeads receives an array of strings in order to produce an array of TableHead components.
  const makeHeads = strArray => {
    strArray.map(rowName =>
      rowHeads.push(
        <TableRow>
          <TableCell className={classes.tableCellCatagory}>
            {rowName.toUpperCase()}
          </TableCell>
        </TableRow>
      )
    );
  };

  // makeRows receives a state object and an empty array.
  // It iterates over the state object to produce an array of TableRow components.
  const makeRows = (dataObj, rowArray) => {
    for (const [key, value] of Object.entries(dataObj)) {
      rowArray.push(
        <TableRow key={`pod-row-${key}`}>
          <TableCell
            component="th"
            scope="row"
            className={classes.tableCellItem}>
            {key}
          </TableCell>
          <TableCell align="left" className={classes.tableCellItem}>
            {value}
          </TableCell>
        </TableRow>
      );
    }
    return;
  };

  // The helper functions above are used here to produce all elements needed to construct the Table.
  makeHeads(rowNames);
  makeRows(metadata, metadataRows);
  makeRows(spec, specRows);
  makeRows(status, statusRows);

  return (
    <TableContainer>
      <Table className={classes.table} size="small" aria-label="a dense table">
        {/* rowsArray is an array of arrays. */}
        {rowsArray.map((rows, index) => {
          return (
            <>
              <TableHead className={classes.tableHead}>
                {/* Include a single TableHead component for each collection of rows */}
                {rowHeads[index]}
              </TableHead>
              <TableBody>
                {/* Multiple TableRow elements */}
                {rows}
              </TableBody>
            </>
          );
        })}
      </Table>
    </TableContainer>
  );
}

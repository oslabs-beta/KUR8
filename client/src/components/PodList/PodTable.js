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

export default function PodTable(props) {
  const classes = useStyles();
  const headNames = ['metadata', 'spec', 'status'];
  const rowNames = [];
  const rowData = [];
  const rowsArray = [];

  // Iterate over all the passed down props
  Object.entries(props).forEach(entry => {
    const [key, value] = entry;
    rowNames.push(key);
    rowData.push(value);
  });

  // Produce an array of TableHead components from the rowNames array.
  const rowHeads = rowNames.map(rowName => {
    // If there are any containers, add the 'CONTAINER' string to the TableCell header.
    let isContainer = !headNames.includes(rowName);
    return (
      <TableRow key={`row-${rowName}`}>
        <TableCell className={classes.tableCellCatagory}>
          {isContainer
            ? `${rowName.toUpperCase()} CONTAINER`
            : rowName.toUpperCase()}
        </TableCell>
      </TableRow>
    );
  });

  // Create an array of TableRow components from each data object.
  // Each data object corresponds to table section.
  rowData.forEach(dataObj => {
    let temp = [];

    Object.entries(dataObj).forEach(entry => {
      const [key, value] = entry;
      // Remove non-primitive values, since they wont render within a TableCell correctly.
      if (typeof value === 'object') return;
      temp.push(
        <TableRow key={`pod-row-${key}`}>
          <TableCell
            component="th"
            scope="row"
            className={classes.tableCellItem}>
            {key}
          </TableCell>
          <TableCell align="left" className={classes.tableCellItem}>
            {String(value)}
          </TableCell>
        </TableRow>
      );
    });
    // Construct an larger array of arrays
    rowsArray.push(temp);
    temp = [];
  });

  return (
    <TableContainer>
      <Table className={classes.table} size="small" aria-label="a dense table">
        {/* rowsArray is an array of arrays. */}
        {rowsArray.map((rows, index) => {
          return (
            <div key={`table-section-${index}`}>
              <TableHead className={classes.tableHead}>
                {/* Include a single TableHead component for each collection of rows */}
                {rowHeads[index]}
              </TableHead>
              <TableBody>
                {/* Multiple TableRow elements */}
                {rows}
              </TableBody>
            </div>
          );
        })}
      </Table>
    </TableContainer>
  );
}

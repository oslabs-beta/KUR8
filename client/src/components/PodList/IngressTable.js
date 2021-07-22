import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 400,
    border: 'none',
  },
  tableHead: {
    width: '100%',
  },
  tableCellCategory: {
    padding: '6px 0px 6px 12px',
    textAlign: 'left',
    backgroundColor: theme.palette.grey[300],
  },
  tableCellItem: {
    padding: '6px 0px 6px 12px',
    textAlign: 'left',
    borderBottom: 'none',
  },
}));

export default function IngressTable({ ingresses }) {
  const classes = useStyles();
  const { paths } = ingresses;
  const rows = [];
  const columnNames = [];

  // Iterate over the first object in the `paths` array to create an array of columnNames.
  for (const prop in paths[0]) {
    columnNames.push(prop);
  }

  const makeRows = data => {
    const rowValuesArray = [];
    // .map() over ingress data to gain access to each object
    data.map(pathObj => {
      // Create a placeholder array
      let valueArray = [];
      // Pass each object into Object.entries and use array destructing to extract
      // each property into the variables `key` and `value`.
      for (const [key, value] of Object.entries(pathObj)) {
        // Push all values of a single object an empty array.
        valueArray.push(value);
      }
      // After constructing an array of values per object, push each array into another array.
      // This larger array will be used to produce TableRow components.
      rowValuesArray.push(valueArray);
      // Clear the placeholder array to be used for the next iteration.
      valueArray = [];
    });

    // Loop over the newly created array of row values
    rowValuesArray.forEach((arrayOfValues, index) => {
      // Push a TableRow element with multiple table cells into the emtpy array `rows`.
      rows.push(
        <TableRow key={`ingress-row-${index}`}>
          {/* .map() over the arrayOfValues to return an array of TabelCell components */}
          {arrayOfValues.map((value, index) => {
            return (
              <TableCell
                style={
                  typeof value === 'number' ? { textAlign: 'center' } : null
                }
                key={`table-cell-${index}`}
                align="left"
                className={classes.tableCellItem}>
                {value}
              </TableCell>
            );
          })}
        </TableRow>
      );
    });
  };

  // Create our TableRow components.
  makeRows(paths);
  return (
    <TableContainer>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead className={classes.tableHead}>
          <TableRow>
            {/* .map() over the columnNames array to produce an array of TableCell components. */}
            {columnNames.map((columnName, index) => (
              <TableCell
                style={
                  columnName === 'servicePort' ? { textAlign: 'center' } : null
                }
                key={`column-name-${index}`}
                className={classes.tableCellCategory}>
                <Typography>{columnName}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {/* `rows` is an array of TableRow components */}
        <TableBody>{rows}</TableBody>
      </Table>
    </TableContainer>
  );
}

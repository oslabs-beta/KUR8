import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 600,
    border: 'none',
  },
  tableHead: {
    width: '100%',
  },
  tableCellCatagory: {
    border: 'none',
    minWidth: '200px',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.common.defaultDarkBackground
        : theme.palette.grey[400],
  },
  tableCellItem: {
    borderBottom: 'none',
    overflowWrap: 'anywhere',
  },
  row: {},
}));

export default function ModalTable({ nodeData }) {
  const classes = useStyles();
  const rowHeads = [];
  const rowNames = [];
  const rowDataObjs = [];
  const rowsArray = [];
  let tableData = nodeData;

  // Check to see if the cluster configuration consists of a single node
  if (Array.isArray(nodeData)) tableData = nodeData[0];

  // Create arrays of both the property names and their corresponding values
  Object.entries(tableData).forEach(entry => {
    const [key, value] = entry;
    rowNames.push(key);
    rowDataObjs.push(value);
  });

  // Iterate over the state object to produce an array of TableRow components.
  const makeRows = dataObj => {
    let temp = [];
    Object.entries(dataObj).forEach(entry => {
      const [key, value] = entry;
      temp.push(
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
    });
    rowsArray.push(temp);
  };

  // Produce an array of TableHead components with each row name.
  rowNames.map(rowName =>
    rowHeads.push(
      <TableRow key={`row-name-${rowName}`}>
        <TableCell className={classes.tableCellCatagory}>
          {rowName.toUpperCase()}
        </TableCell>
      </TableRow>
    )
  );

  // Create an array of TableRow components for each data object.
  rowDataObjs.forEach(dataObj => makeRows(dataObj));

  return (
    <TableContainer>
      <Table className={classes.table} size="small" aria-label="a dense table">
        {/* rowsArray is an array of arrays. */}
        {rowsArray.map((rows, index) => {
          return (
            <div className={classes.row} key={`table-section-${index}`}>
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

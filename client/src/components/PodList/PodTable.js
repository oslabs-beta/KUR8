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

  const makeHeads = strArray => {
    strArray.map(rowName =>
      rowHeads.push(
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell className={classes.tableCellCatagory}>
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

  makeHeads(rowNames);
  makeRows(metadata, metadataRows);
  makeRows(spec, specRows);
  makeRows(status, statusRows);

  return (
    <TableContainer>
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

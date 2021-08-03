import { makeStyles, useTheme } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';
import Link from '@material-ui/core/Link';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

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
    border: 'none',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.common.defaultDarkBackground
        : theme.palette.common.defaultLightBackground,
  },
  tableCellItem: {
    padding: '6px 0px 6px 12px',
    textAlign: 'left',
    borderBottom: 'none',
  },
  link: {
    color: theme.palette.error.main,
  },
}));

export default function AccordianTable({ groupData }) {
  const classes = useStyles();
  const theme = useTheme();
  const rows = [];
  const rowsArray = [];

  // Iterate over the groupData object to produce an array of key/value pairs.
  Object.entries(groupData).forEach(entry => {
    const [key, value] = entry;
    rowsArray.push([key, String(value)]);
  });

  // Produce the `rows` array to consist of Material UI TableRow elements with the correct values.
  rowsArray.forEach(cellPair => {
    rows.push(
      <TableRow key={uuidv4()}>
        {/* Each row will contain two TableCells, both created from this map() */}
        {cellPair.map(value => {
          // Initialize modifiedValue as the value if none of the below checks satifies.
          let modifiedValue = value;

          //  If the value is a link, produce a link as the value.
          if (value.includes('https://')) {
            modifiedValue = (
              <Link className={classes.link} href={value}>
                {value}
              </Link>
            );
          }

          // If the value is a Date, produce a human readable string as the value.
          if (value[value.length - 1] === 'Z') {
            const date = new Date('2019-10-25T08:10:00Z');
            const isoDate = date.toISOString();
            // prettier-ignore
            modifiedValue = `${isoDate.substr(11, 8)} - ${isoDate.substr(0, 10)} `;
          }
          return (
            <TableCell
              key={uuidv4()}
              align="left"
              style={
                value === 'firing' ? { color: theme.palette.error.main } : null
              }
              className={classes.tableCellItem}>
              {modifiedValue}
            </TableCell>
          );
        })}
      </TableRow>
    );
  });

  return (
    <TableContainer>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableBody>{rows}</TableBody>
      </Table>
    </TableContainer>
  );
}

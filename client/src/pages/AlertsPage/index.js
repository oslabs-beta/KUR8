import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Chip from '@material-ui/core/Chip';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LinearProgress from '@material-ui/core/LinearProgress';
import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';

import { fetchAlerts } from '../../actions/alertsActionCreator';
import AccordianTable from './AccordianTable';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(0, 2),
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '25%',
    flexShrink: 0,
  },
  firingChip: {
    color: theme.palette.common.white,
    borderColor: theme.palette.primary.accent,
    backgroundColor: theme.palette.primary.accent,
  },
  subgroupNumberActive: {
    marginLeft: theme.spacing(1),
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  groupHeadingTitle: {},
  chips: {
    marginRight: theme.spacing(1),
  },
  groupHeader: {
    margin: '0px 0px 12px 0px',
    '&:first-child': {
      margin: '12px 0px 12px 0px',
    },
    padding: '12px 21px 12px 16px',
    border: 'none',
    borderRadius: '3px',
    color: theme.palette.common.white,
    boxShadow: theme.palette.type === 'dark' ? 'none' : theme.shadows[3],
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey[900]
        : theme.palette.grey['A700'],
  },
}));

function AlertPage({ fetchAlerts, alertGroups, isLoading }) {
  useEffect(() => fetchAlerts(), []);
  const classes = useStyles();
  const theme = useTheme();

  // These are placeholder arrays created and used in the helper functions below to construct JSX.
  // The position of each element in each array corresponds with data in the other arrays at the same
  // index position. This enables the ability use a common index value to construct UI.
  const groupNames = [];
  const groupDataArr = [];
  const displayInactiveTagPerGroup = [];
  const numFiringPerGroup = [];

  // `titles` and `accordians` will contain all final JSX elements to render
  const titles = [];
  const accordians = [];

  // Extract the name of each group and it's respective data object into seperate arrays
  alertGroups.forEach(group => {
    Object.entries(group).forEach(entry => {
      const [name, dataObj] = entry;
      groupNames.push(name);
      groupDataArr.push(dataObj);
    });
  });

  // This is a helper function used on LINE 166 to produce an array of headers, one for each group of alerts.
  const makeGroupHeaders = (name, index) => {
    titles.push(
      <div className={classes.groupHeader}>
        <div className={classes.flexRow}>
          <Typography className={classes.groupHeadingTitle}>{name}</Typography>
          <div>
            {displayInactiveTagPerGroup[index] ? (
              <Chip
                className={classes.chips}
                variant="outlined"
                color="primary"
                size="small"
                label="inactive"
              />
            ) : null}
            {displayInactiveTagPerGroup[index] ? null : (
              <Chip
                variant="outlined"
                className={classes.firingChip}
                size="small"
                label={`firing (${numFiringPerGroup[index]})`}
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  // numFiring counts how many actively firing alerts are found within each group of alerts.
  // It resets after each group completes its iteration process.
  let numFiring = 0;
  // `makeAccordians` produces an array of expanding panels to be displayed under each group heading.
  const makeAccordians = dataObj => {
    let tempAccordian = [];
    let tempActiveStateStatus = [];

    // Each `groupDataObj` is flat, with all values as primitives.
    dataObj.forEach(groupDataObj => {
      // These if statements will produce an array of booleans that will be used to display "inactive"
      // and "firing (n)" tags for each accordian.
      if (groupDataObj.state === 'firing') numFiring += 1;
      // prettier-ignore
      if (groupDataObj.state === 'inactive' || groupDataObj.state === undefined) {
        tempActiveStateStatus.push(true);
      } else if (groupDataObj.state !== 'inactive') {
        tempActiveStateStatus.push(false);
      }
      // `id` is used here to create unique aria-controls and id's for each AccordiaSummary component.
      // This prevents the accordians who share the same index position of each group from expanding
      // together onClick.
      const id = uuidv4();
      tempAccordian.push(
        <Accordion className={classes.accordian}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${id}a-content`}
            id={`panel${id}a-header`}>
            <Typography className={classes.subgroupHeading}>
              {groupDataObj.name}
            </Typography>
            <Typography
              className={classes.subgroupNumberActive}
              style={
                // Change the color of "firing" to red
                groupDataObj.state === 'firing'
                  ? { color: theme.palette.error.main }
                  : null
              }>
              ({groupDataObj.state === 'firing' ? 1 : 0} active)
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <AccordianTable groupData={groupDataObj} />
            </Typography>
          </AccordionDetails>
        </Accordion>
      );
    });
    // The rest of this function is used to create a set of arrays with the same number of elements.
    // The position of each element in each array corresponds with data in the other arrays at the same
    // index position. This enables the ability use a common index value to construct UI.

    // Push each subgroup of alert components into the larger accordians array.
    accordians.push(tempAccordian);
    // if all of this group's collected tempActiveStateStatus are true, push a single value of true
    // into displayInactiveTagPerGroup. This will be referenced by index value in `makeGroupHeaders`
    displayInactiveTagPerGroup.push(!tempActiveStateStatus.includes(false));
    // Each group will display the total number of alerts that curreting in a firing state.
    numFiringPerGroup.push(numFiring);
    // Reset placeholder/temporary variables for use in the next group.
    numFiring = 0;
    tempAccordian = [];
    tempActiveStateStatus = [];
  };

  // This will use the helper functions above to produce all the Accordian elements needed to produce UI.
  groupDataArr.forEach((groupDataObj, index) => {
    // `groupDataArr` was created on LINE 82. It contains all data objects of each alert
    makeAccordians(groupDataObj);
    // Use `index` to target the appropriate value in the groupName array.
    makeGroupHeaders(groupNames[index], index);
  });

  // If the data is still loading, display a loading bar beneath the AppBar.
  return isLoading ? (
    <LinearProgress color="secondary" />
  ) : (
    <div className={classes.root}>
      {titles.map((title, index) => (
        <div key={uuidv4()}>
          <div>{title}</div>
          <div>{accordians[index]}</div>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    alertGroups: state.alertsReducer.alertGroups,
    isLoading: state.alertsReducer.isLoading,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchAlerts }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AlertPage);

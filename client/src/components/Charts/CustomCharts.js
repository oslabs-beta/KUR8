import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React, { useEffect, useState } from 'react';
import ZingChart from 'zingchart-react';

import { deleteCustom, moveDnd } from '../../actions/metricsActionCreators';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
    height: '580px',
    marginBottom: theme.spacing(2),
  },
  halfedTop: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
    height: '248px',
  },
  halfedBottom: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
    height: '248px',
  },
  submitButton: {
    height: '50px',
    width: '100%',
    '&:hover': {
      color: theme.palette.common.white,
      background:
        theme.palette.type === 'dark'
          ? theme.palette.grey[900]
          : theme.palette.grey[700],
    },
  },
}));

//takes in the list of custom charts and position index and reorders the list of charts depending on where its dropped
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function CustomCharts({ customDataArray, deleteCustom, moveDnd, props }) {
  const classes = useStyles();
  const theme = useTheme();
  const custom = [];

  //drag and drop
  const list = [...customDataArray];
  const onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const items = reorder(list, result.source.index, result.destination.index);
    moveDnd(items);
  };

  //create an array custom charts
  customDataArray.map((dataSet, index) => {
    if (dataSet.length !== 0) {
      const config = {
        type: 'line',
        globals: {
          backgroundColor: theme.palette.type === 'dark' ? '#424242' : 'white',
          color: theme.palette.type === 'dark' ? 'white' : '#424242',
        },
        plot: {
          stacked: true,
          marker: {
            visible: false,
          },
        },
        title: {
          text: dataSet[0].metric.__name__,
        },
        'scale-x': {
          zooming: true,
          item: {
            'font-size': 12,
            'font-color': theme.palette.type === 'dark' ? 'white' : '#424242',
          },
        },
        'scale-y': {
          item: {
            'font-size': 12,
            'font-color': theme.palette.type === 'dark' ? 'white' : '#424242',
          },
        },
        series: dataSet.map(dataPoint => {
          return { values: dataPoint.yRange };
        }),
      };

      //pushing each indivual chart into its own draggable component
      custom.push(
        <Draggable key={index} draggableId={`${index}`} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}>
              <Grid item xs={12}>
                <Paper
                  className={classes.paper}
                  style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <br />
                  {/* Passing in the index to allow the deleteCustom function to find this chart*/}
                  <ZingChart id={`custom chart ${index}`} data={config} />
                  {/* Passing in the dispatch with current index of the graph to map each delete button to its own chart*/}
                  <Button
                    onClick={() => deleteCustom(index)}
                    variant="outlined"
                    className={classes.submitButton}>
                    delete
                  </Button>
                </Paper>
              </Grid>
            </div>
          )}
        </Draggable>
      );
    }
  });

  return (
    <Grid item xs={12}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {custom}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Grid>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ deleteCustom, moveDnd }, dispatch);

export default connect(null, mapDispatchToProps)(CustomCharts);

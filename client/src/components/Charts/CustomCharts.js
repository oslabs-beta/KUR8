import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteCustom, moveDnd } from '../../actions/metricsActionCreators';
// import 'zingchart/es6';
import ZingChart from 'zingchart-react';
// import 'zingchart/modules-es6/zingchart-maps.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa.min.js';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
    height: '512px',
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
}));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function CustomCharts({ customDataArray, deleteCustom, moveDnd }) {
  const classes = useStyles();
  const custom = [];

  //drag and drop
  const list = [...customDataArray]
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const items = reorder(
      list,
      result.source.index,
      result.destination.index
    );
    moveDnd(items)
  }

  //create custom charts
  customDataArray.map( (dataSet, index) => {
    const config = {
      type: 'area',
      plot: {
        stacked: true,
        marker: {
          visible: false,
        },
      },
      title: {
        text: dataSet[0].metric.__name__
      },
      'scale-x': {
        zooming: true,
      },
      'scale-y': {
        item: {
          'font-size': 8,
        },
      },
      series: dataSet.map(dataPoint => {
        return {values: dataPoint.yRange}
      })
    }

    custom.push(
      <Draggable key={index} draggableId={`${index}`} index={index}>
        {(provided, snapshot) => (
          <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          >
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <button
                onClick={() => deleteCustom(index)}
                >delete</button>
                <ZingChart id={`custom chart ${index}`} data={config} />
              </Paper>
            </Grid>
          </div>
        )}
      </Draggable>
    )
  })

  return (
    <Grid item xs={12}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}>
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
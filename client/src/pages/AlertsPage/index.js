import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { fetchAlerts } from '../../actions/alertsActionCreator'
import { Typography } from '@material-ui/core';

function AlertPage({ fetchAlerts, alertGroups }) {

  useEffect(() => fetchAlerts(),[])

  const alertsList = alertGroups.map((group) => {

    const alerts = group.rules.map((data) => {
      return (
        <Paper>
          {`state: ${data.state}`}
          {`name: ${data.name}`}
          {`query: ${data.query}`}
          {`duration: ${data.duration}`}
          {/* {data.labels}
          {data.annotations} */}
          {`alerts: ${data.alerts}`}
          {`health: ${data.health}`}
          {`evaluationTime: ${data.evaluationTime}`}
          {`lastEvaluation: ${data.lastEvaluation}`}
          {`type: ${data.type}`}
        </Paper>
      );
    })

    return (
      <Grid container spacing={4}>
        <Grid item xs={12}>        
          {group.name}
          {alerts}
        </Grid>
      </Grid>
    )
  })

  return alertsList;
}

const mapStateToProps = state => {
  return {
    alertGroups: state.alertsReducer.alertGroups,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({ fetchAlerts }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AlertPage);

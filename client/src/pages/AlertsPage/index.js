import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Grid from '@material-ui/core/Grid';
import { fetchAlerts } from '../../actions/alertsActionCreator'

function AlertPage({ fetchAlerts, alertGroups }) {

  useEffect(() => fetchAlerts(),[])

  const alerts = alertGroups.map((group) => {
    


    return (
      <Grid container spacing={4}>
        <Grid item xs={12}>        
          {group.name}
        </Grid>
      </Grid>
    )
  })

  return alerts;
}

const mapStateToProps = state => {
  return {
    alertGroups: state.alertsReducer.alertGroups,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({ fetchAlerts }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AlertPage);

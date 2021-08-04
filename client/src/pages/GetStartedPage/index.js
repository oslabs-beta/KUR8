import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';

import Instructions from './Instructions';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  dialog: {
    width: '1000px',
  },
});

function GetStartedPage({ history }) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const cookies = new UniversalCookie();

  // On intial load, perform all fetch requests to populate our app with data
  // Check to see if GetStartedPage has set a cookie
  useEffect(() => {
    const beenHere = cookies.get('hasSeenGetStartedPage');
    if (beenHere) history.push('/structure');
  }, []);

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      aria-labelledby="customized-dialog-title"
      open={open}>
      <MuiDialogTitle disableTypography className={classes.dialogTitle}>
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="center">
          <Typography textAlign="center" variant="h6" component="h1">
            Getting Started
          </Typography>
          <Typography textAlign="center" variant="body1">
            Deploying Prometheus
          </Typography>
        </Grid>
      </MuiDialogTitle>
      <MuiDialogContent dividers>
        <Grid container direction="column" alignItems="flex-start">
          <Instructions closeModal={closeModal} cookies={cookies} />
        </Grid>
      </MuiDialogContent>
    </Dialog>
  );
}

export default withRouter(GetStartedPage);

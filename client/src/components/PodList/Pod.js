import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import PodTable from './PodTable';

const useStyles = makeStyles(theme => ({
  dialogContent: {
    padding: theme.spacing(2),
  },
  dialogActions: {
    margin: 0,
    padding: theme.spacing(1),
  },
  podName: {
    textAlign: 'center',
  },
  kubernetesShapeWrap: {
    filter: 'drop-shadow(-1px 6px 3px rgba(0, 0, 0, 0.5))',
  },
  kubernetesShape: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: theme.spacing(20),
    width: theme.spacing(20),
    margin: theme.spacing(1),
    background: 'rgb(26, 115, 232)',
    boxShadow: theme.shadows[10],
    clipPath:
      'polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%)',
  },
  containersShape: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: theme.spacing(7),
    width: theme.spacing(7),
    border: 'dashed 1px white',
    borderRadius: '50%',
    color: 'white',
    fontSize: '2rem',
  },
}));

const DialogTitleStyles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(DialogTitleStyles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

function Pod({ containers, metadata, spec, status }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Grid item>
      <div className={classes.kubernetesShapeWrap}>
        <div className={classes.kubernetesShape} elevation={3}>
          <div className={classes.containersShape} onClick={handleClickOpen}>
            {containers.list.length}
          </div>
          <Dialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              {containers.list[0].name}
            </DialogTitle>
            <MuiDialogContent dividers>
              <PodTable
                metadata={metadata}
                spec={spec}
                status={status}
                containers={containers}
              />
            </MuiDialogContent>
            <MuiDialogActions>
              <Button autoFocus onClick={handleClose} color="primary">
                Close
              </Button>
            </MuiDialogActions>
          </Dialog>
        </div>
      </div>
      <Typography className={classes.podName} as="body1">
        {containers.list[0].name}
      </Typography>
    </Grid>
  );
}

export default Pod;

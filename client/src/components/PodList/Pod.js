import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import PodTable from './PodTable';

const useStyles = makeStyles(theme => ({
  dialogTitle: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
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
    height: theme.spacing(25),
    width: theme.spacing(25),
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
  chipClusterIp: {
    color: '#fff',
    borderColor: '#fff',
    margin: '15px 0px',
  },
  podText: {
    color: '#fff',
    marginTop: '25px',
  },
}));

function Pod({ containers, metadata, spec, status, clusterIP }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

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
          <Tooltip disableFocusListener placement="left" title="ClusterIP">
            <Chip
              className={classes.chipClusterIp}
              variant="outlined"
              size="small"
              label={clusterIP}
            />
          </Tooltip>
          <Tooltip disableFocusListener placement="left" title="More Info">
            <div className={classes.containersShape} onClick={handleClickOpen}>
              {containers.list.length}
            </div>
          </Tooltip>
          <Dialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}>
            <MuiDialogTitle disableTypography className={classes.dialogTitle}>
              <Typography variant="h6">{containers.list[0].name}</Typography>
              <IconButton
                aria-label="close"
                className={classes.closeButton}
                onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </MuiDialogTitle>
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
          <Typography className={classes.podText}>Pod</Typography>
        </div>
      </div>
      <Typography className={classes.podName} as="body1">
        {containers.list[0].name}
      </Typography>
    </Grid>
  );
}

export default Pod;

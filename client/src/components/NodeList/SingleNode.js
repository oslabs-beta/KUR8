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
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import Ingress from './Ingress';
import ModalTable from './ModalTable';
import Pod from '../PodList/Pod';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
  },
  chipClusterIp: {
    color: theme.palette.common.black,
    borderColor: 'none',
    margin: '15px 0px',
    cursor: 'pointer',
    boxShadow: theme.shadows[3],
  },
  ingressContainer: {
    margin: theme.spacing(3, 0),
  },
}));

function SingleNode({ masterNodeData, pods, ingresses, services }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  if (masterNodeData.length === 0) return 'loading'
  return (
    <Paper className={classes.paper} elevation={1}>
      <Tooltip
        disableFocusListener
        placement="top"
        title="More Info"
        onClick={handleClickOpen}>
        <Chip
          className={classes.chipClusterIp}
          variant="outlined"
          size="medium"
          label={`Node: ${masterNodeData[0].metadata.name}`}
        />
      </Tooltip>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}>
        <MuiDialogTitle disableTypography className={classes.dialogTitle}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center">
            <Typography variant="h6">
              {masterNodeData[0].metadata.name}
            </Typography>
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </MuiDialogTitle>
        <MuiDialogContent dividers>
          <ModalTable nodeData={masterNodeData} />
        </MuiDialogContent>
        <MuiDialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </MuiDialogActions>
      </Dialog>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center">
        {pods.map((pod, index) => {
          return (
            <Pod
              key={`pod-${index}`}
              clusterIP={services[index].spec.clusterIP}
              {...pod}
            />
          );
        })}
      </Grid>
      <Grid
        container
        className={classes.ingressContainer}
        direction="row"
        justifyContent="center"
        alignItems="center">
        <Ingress ingresses={ingresses} />
      </Grid>
    </Paper>
  );
}

export default SingleNode;

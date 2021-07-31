import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import PodList from '../PodList';
import ModalTable from './ModalTable';

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: '#f3f3f3',
    padding: theme.spacing(2),
    width: '100%',
    margin: theme.spacing(1, 0),
    '&:first-child': {
      margin: theme.spacing(0, 0, 1),
    },
    '&:last-child': {
      margin: theme.spacing(1, 0, 0),
    },
  },
  chipNodeName: {
    cursor: 'pointer',
    color: '#000',
    boxShadow: theme.shadows[3],
    border: 'none',
  },
  dialogTitle: {
    margin: 0,
    padding: theme.spacing(2),
  },
  dialogContent: {
    padding: theme.spacing(2),
  },
  dialogActions: {
    margin: 0,
    padding: theme.spacing(1),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

function WorkerNode({ pods, metadata, services, nodeData }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Paper className={classes.paper} elevation={2}>
      <Chip
        onClick={handleClickOpen}
        className={classes.chipNodeName}
        size="medium"
        variant="outlined"
        label={metadata.name}
      />
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}>
        <MuiDialogTitle
          onClose={handleClose}
          disableTypography
          className={classes.dialogTitle}>
          <Typography variant="h6">{metadata.name}</Typography>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        <MuiDialogContent dividers>
          <ModalTable nodeData={nodeData} />
        </MuiDialogContent>
        <MuiDialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </MuiDialogActions>
      </Dialog>
      <PodList pods={pods ? pods : null} services={services} />
    </Paper>
  );
}

export default WorkerNode;

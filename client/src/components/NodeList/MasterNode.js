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
import React, { useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import ModalTable from './ModalTable';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(5),
  },
  moreInfo: {
    fontFamily: 'serif',
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
    margin: theme.spacing(3, 0),
    background:
      theme.palette.type === 'dark'
        ? theme.palette.primary.accent
        : theme.palette.primary.accent,
    clipPath:
      'polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%)',
  },
  containersShape: {
    cursor: 'pointer',
    marginBottom: '12px',
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
  title: {
    color: '#fff',
  },
  chipNodeName: {
    color: '#fff',
    borderColor: '#fff',
    margin: '15px 0px',
  },
}));

function MasterNode({ name, nodeData }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className={classes.kubernetesShapeWrap}>
        <div className={classes.kubernetesShape} elevation={3}>
          <Tooltip disableFocusListener placement="left" title="Name">
            <Chip
              className={classes.chipNodeName}
              variant="outlined"
              size="small"
              label={name}
            />
          </Tooltip>
          <Tooltip disableFocusListener placement="left" title="More Info">
            <div className={classes.containersShape} onClick={handleClickOpen}>
              <Typography className={classes.moreInfo} variant="h4">
                i
              </Typography>
            </div>
          </Tooltip>
          <Dialog
            maxWidth="md"
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}>
            <MuiDialogTitle disableTypography className={classes.dialogTitle}>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center">
                <Typography variant="h6">{name}</Typography>
                <IconButton
                  aria-label="close"
                  className={classes.closeButton}
                  onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </Grid>
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
          <Typography className={classes.title}>Master</Typography>
        </div>
      </div>
    </>
  );
}

export default MasterNode;

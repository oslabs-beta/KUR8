import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router';

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.secondary.main
        : theme.palette.primary.main,
  },
}));

const StyledSwitch = withStyles((theme) => ({
  switchBase: {
    color: theme.palette.common.white,
    '&$checked': {
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.secondary.light,
        borderColor: theme.palette.secondary.light,
      },
    },
  },
  track: {
    opacity: 1,
    backgroundColor: theme.palette.primary.light,
  },
  checked: {
    color: theme.palette.primary.light,

  },
}))(Switch);

function MyAppBar({ history, darkMode, toggleDarkMode }) {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center">
          <Typography variant="h6" noWrap onClick={() => history.push(`/`)}>
            KUR8
          </Typography>
          <FormGroup>
            <FormControlLabel
              className={classes.darkModeSwitchContainer}
              control={
                <StyledSwitch
                  // className={classes.darkModeSwitch}
                  checked={darkMode}
                  onChange={toggleDarkMode}
                />
              }
            />
          </FormGroup>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(MyAppBar);

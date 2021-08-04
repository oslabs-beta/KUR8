import { makeStyles, withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import AppBar from '@material-ui/core/AppBar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Switch from '@material-ui/core/Switch';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey[900]
        : theme.palette.grey[200],
  },
  title: {
    color:
      theme.palette.type === 'dark'
        ? theme.palette.common.white
        : theme.palette.common.black,
  },
}));

const StyledSwitch = withStyles(theme => ({
  switchBase: {
    color: theme.palette.common.white,
    '&$checked': {
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: '#9ccef2',
        borderColor: theme.palette.secondary.light,
      },
    },
  },
  track: {
    opacity: 1,
    backgroundColor: '#c1e0f7',
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
          <Typography
            className={classes.title}
            variant="h6"
            noWrap
            onClick={() => history.push(`/`)}>
            KUR8
          </Typography>
          <FormGroup>
            <FormControlLabel
              className={classes.darkModeSwitchContainer}
              control={
                <StyledSwitch
                  id="themetouglebutton"
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

import React from 'react';
import { withRouter } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import Toolbar from '@material-ui/core/Toolbar';
import { useParams, useHistory } from 'react-router-dom';
import MyAppBar from './MyAppBar';
import BarChartIcon from '@material-ui/icons/BarChart';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.common.defaultDarkBackground
        : theme.palette.grey[200],
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey['A400']
        : theme.palette.grey[300],
  },
}));

const Layout = ({ children, history, toggleDarkMode, darkMode }) => {
  const classes = useStyles();
  const pages = ['Structure', 'Metrics', 'Custom', 'Alerts'];
  const icons = [
    <LocationCityIcon />,
    <AvTimerIcon />,
    <BarChartIcon />,
    <NotificationsActiveIcon />,
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MyAppBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      {/* {Display} */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}>
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {pages.map((text, index) => (
              <ListItem
                button
                key={text}
                onClick={() => history.push(`/${text.toLowerCase()}`)}>
                <ListItemIcon>{icons[index]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        {children}
      </main>
    </div>
  );
};

export default withRouter(Layout);

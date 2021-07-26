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
import CustomQuery from '../Charts/CustomQuery';
import BarChartIcon from '@material-ui/icons/BarChart';

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
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Layout = ({ children, history}) => {
  const classes = useStyles();

  // if (location.pathname === '/')

//   <Drawer
//   className={classes.drawer}
//   variant="permanent"
//   classes={{
//     paper: classes.drawerPaper,
//   }}>
//   <Toolbar />
//   <div className={classes.drawerContainer}>
//     <List>
//       {['Structure', 'Metrics'].map((text, index) => (
//         <ListItem
//           button
//           key={text}
//           onClick={() => history.push(`/${text.toLowerCase()}`)}>
//           <ListItemIcon>
//             {index % 2 === 0 ? <LocationCityIcon /> : <AvTimerIcon />}
//           </ListItemIcon>
//           <ListItemText primary={text} />
//         </ListItem>
//       ))}
//     </List>
//   </div>
// </Drawer>

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MyAppBar />
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
            {['Structure', 'Metrics', 'Custom'].map((text, index) => (
              <ListItem
                button
                key={text}
                onClick={() => history.push(`/${text.toLowerCase()}`)}>
                <ListItemIcon>
                  {index === 0 ? <LocationCityIcon /> : index === 1 ? <AvTimerIcon /> : <BarChartIcon />}
                </ListItemIcon>
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

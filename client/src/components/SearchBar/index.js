import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { CompassCalibrationOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  input: {
    height: 50
  }
}));

function SearchBar() {

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const handleNesting = () => {
    setOpen(!open);
  };
  
  const handleChange = (event) => {
    setSearch(event.target.value);
    highlight()
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log( 'search:', search); 
    // fetchCustomQuery(query, range, step, title);
  }

  const highlight = () => {
    let divs= document.getElementsByTagName('div');
    for (let i = 0; i < divs.length; i++) {
      if(divs[i].innerHTML.indexOf(search) !== -1 && divs[i].className.includes('kubernetesShapeWrap')) {
        console.log(divs[i], search)
        divs[i].classList.remove("kubernetesShape")
        divs[i].className = "kubernetesShapeHighlighted"
      }
    }
  }

  return (
    <List>
      <ListItem button onClick={handleNesting}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Search Structures" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <ListItem button>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              id="searchbar"
              label="Search"
              value={search}
              onChange={handleChange}
              variant="outlined"
              className={classes.input}
            />
          </form>
        </ListItem>
      </Collapse>
    </List>
  );
}

const mapStateToProps = state => {
  return {

  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ }, dispatch);

  export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
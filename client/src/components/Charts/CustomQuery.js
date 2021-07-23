import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function CustomQuery() {
  const classes = useStyles();
  const [value, setValue] = React.useState('Enter Query Here');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="filled-multiline-static"
          label="Query"
          multiline
          maxRows={4}
          value={value}
          onChange={handleChange}
          defaultValue="Default Value"
          variant="filled"
        />
      </div>
    </form>
  );
}
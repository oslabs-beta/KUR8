import { red } from '@material-ui/core/colors';
import { createTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#053742',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#A2DBFA',
      contrastText: '#000000',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;

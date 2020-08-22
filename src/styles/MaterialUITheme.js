import { createMuiTheme } from '@material-ui/core/styles';
import { red, lightBlue } from '@material-ui/core/colors';

export default createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
          main: red[800]
      },
      secondary: {
          main: lightBlue[400]
      }
    },
});
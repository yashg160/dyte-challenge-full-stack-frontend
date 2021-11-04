import { createTheme } from '@material-ui/core/styles';

import { green } from '@material-ui/core/colors';

const SharedButtonStyles = {
  fontWeight: 400,
  boxShadow: 'none',
  paddingTop: '8px',
  fontFamily: 'Inter',
  borderRadius: '10px',
  textTransform: 'none',
  paddingBottom: '8px',
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#126E82',
      light: '#51C4D3',
    },

    secondary: {
      main: green[500],
      light: green[400],
      dark: green[600],
    },
  },
  overrides: {
    MuiButton: {
      disableElevation: true,
      text: {
        ...SharedButtonStyles,
      },
      contained: {
        ...SharedButtonStyles,
      },
      outlined: {
        ...SharedButtonStyles,
      },
    },
    MuiTypography: {
      fontFamily: 'Inter',
    },
  },
});

export default theme;

import { createTheme } from '@material-ui/core/styles';

const SharedButtonStyles = {
  fontWeight: 400,
  boxShadow: 'none',
  fontFamily: 'Inter',
  borderRadius: '4px',
  textTransform: 'none',
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#001D4A',
      light: '#27476E',
    },
    secondary: {
      main: '#ECA400',
      light: '#FFB60A',
      dark: '#E09D00',
    },
    white: {
      main: '#EAF8BF',
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

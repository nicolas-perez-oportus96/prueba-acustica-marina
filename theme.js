import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#fff', // Color blanco para el texto y los bordes
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#fff', // Color blanco para el texto del InputLabel
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          color: '#fff', // Color blanco para el texto del Select
          borderColor: '#fff', // Color blanco para el borde del Select
          '&:before': {
            borderColor: '#fff', // Color blanco para el borde del Select antes de la selección
          },
          '&:after': {
            borderColor: '#fff', // Color blanco para el borde del Select después de la selección
          },
        },
      },
    },
  },
});

export default theme;
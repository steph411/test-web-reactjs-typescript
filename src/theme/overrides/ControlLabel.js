// ----------------------------------------------------------------------

export default function ControlLabel(theme) {
  return {
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          ...theme.typography.body2,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginTop: theme.spacing(1),
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        outlined: {
          transform: 'translate(14px, 13px) scale(1)',
          '&.Mui-focused':{
            transform: 'translate(14px, -9px) scale(.75)'
          },
          '&.MuiInputLabel-shrink':{
            transform: 'translate(14px, -9px) scale(.75)'
          },
        },
      },
    },
  };
}

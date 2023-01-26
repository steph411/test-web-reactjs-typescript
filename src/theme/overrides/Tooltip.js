// ----------------------------------------------------------------------

export default function Tooltip(theme) {
  const isLight = theme.palette.mode === 'light';

  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: theme.palette.secondary.main,
        },
        arrow: {
          color: theme.palette.secondary.main,
        },
      },
    },
  };
}

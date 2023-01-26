// ----------------------------------------------------------------------

export default function Progress(theme) {
  const isLight = theme.palette.mode === 'light';

  return {
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          height: 2,
          overflow: 'hidden',
        },
        bar: {
          borderRadius: 0,
        },
        colorPrimary: {
          backgroundColor: theme.palette.primary[isLight ? 'lighter' : 'darker'],
        },
        buffer: {
          backgroundColor: 'transparent',
        },
      },
    },
  };
}

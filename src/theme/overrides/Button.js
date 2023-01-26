// ----------------------------------------------------------------------

export default function Button(theme) {
    return {
        MuiButton: {
            defaultProps: {
              variant: 'contained',
              color: 'primary'
            },
            styleOverrides: {
                root: {
                    height: 45,
                    fontSize: 14,
                    fontWeight: 600,
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
                sizeLarge: {
                    height: 42,
                },

                sizeSmall: {
                    height: 38,
                    paddingLeft: 12,
                    paddingRight: 12
                },

                // contained
                // containedInherit: {
                //   color: theme.palette.grey[800],
                //   // boxShadow: theme.customShadows.z8,
                //   '&:hover': {
                //     backgroundColor: theme.palette.grey[400],
                //   },
                // },
                containedPrimary: {
                    // boxShadow: theme.customShadows.primary,
                },
                containedSecondary: {
                    // backgroundColor: '#fff',
                    // color: theme.palette.primary.main,
                    // '&:hover': {
                    //     backgroundColor: theme.palette.info.lighter,
                    // },
                    // boxShadow: theme.customShadows.secondary,
                },
                outlinedInfo: {
                    borderColor: '#E5E5E5',
                    backgroundColor: '#fff',
                    color: '#000000',
                    boxShadow: 'none',
                },
                containedSuccess: {
                    color: '#fff',
                    boxShadow: 'none',
                    // boxShadow: theme.customShadows.success,
                },
                containedWarning: {
                    // boxShadow: theme.customShadows.warning,
                },
                containedError: {
                    // boxShadow: theme.customShadows.error,
                },
                // outlined
                outlinedInherit: {
                    // border: `1px solid ${theme.palette.grey[500_32]}`,
                    // '&:hover': {
                    //     backgroundColor: theme.palette.action.hover,
                    // },
                },
                textInherit: {
                    // '&:hover': {
                    //     backgroundColor: theme.palette.action.hover,
                    // },
                },
            },
        },
    };
}
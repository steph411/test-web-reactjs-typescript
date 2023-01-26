// ----------------------------------------------------------------------

export default function Input(theme) {
    return {
        MuiInputBase: {
            styleOverrides: {
                root: {
                    '&.Mui-disabled': {
                        '& svg': { color: theme.palette.text.disabled },
                    },
                },

                input: {
                    padding: '13px 14px!important',
                    fontSize: 14,
                    '&::placeholder': {
                        opacity: 1,
                        color: theme.palette.text.disabled,
                    },
                },
            },
        },
        MuiInput: {
            styleOverrides: {
                underline: {
                    '&:before': {
                        // borderBottomColor: theme.palette.grey[500 _56],
                    },
                },
            },
        },
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    // backgroundColor: theme.palette.grey[500 _12],
                    '&:hover': {
                        // backgroundColor: theme.palette.grey[500_16],
                    },
                    '&.Mui-focused': {
                        // backgroundColor: theme.palette.action.focus,
                    },
                    '&.Mui-disabled': {
                        // backgroundColor: theme.palette.action.disabledBackground,
                    },
                },
                underline: {
                    '&:before': {
                        // borderBottomColor: theme.palette.grey[500 _56],
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {

                },
                label: {
                    // transform: 'translate(14px, 0px) scale(1)!important'
                },
            },
        },
    };
}
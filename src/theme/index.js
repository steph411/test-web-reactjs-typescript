import PropTypes from 'prop-types';
import {useMemo} from 'react';
import {createTheme, ThemeProvider as MUIThemeProvider} from '@mui/material/styles';

import palette from './palette';
import typography from './typography';
import breakpoints from './breakpoints';
import shadows, {customShadows} from './shadows';
import ComponentsOverrides from "./overrides";

// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
    children: PropTypes.node,
};

export default function ThemeProvider({children}) {
    const isLight = true;
    const themeDirection = 'ltr';

    const themeOptions = useMemo(() => ({
        palette: isLight ? palette.light : palette.dark,
        typography,
        breakpoints,
        shape: {borderRadius: 0},
        direction: themeDirection,
        shadows: isLight ? shadows.light : shadows.dark,
        customShadows: isLight ? customShadows.light : customShadows.dark,
    }), [isLight, themeDirection]);

    const theme = createTheme(themeOptions);

    theme.components = ComponentsOverrides(theme);

    return (
        <MUIThemeProvider theme={theme}>
            {children}
        </MUIThemeProvider>
    );
}

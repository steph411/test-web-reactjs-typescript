import React from 'react';
import './App.css';
import CssBaseline from "@mui/material/CssBaseline";
import HomePage from "./view/Home.page";
import ThemeProvider from "./theme";
import {SnackbarKey, SnackbarProvider, useSnackbar} from "notistack";
import {IconButton} from "@mui/material";

function App() {
    return (
        <SnackbarProvider
            action={snackbarKey => <SnackbarCloseButton snackbarKey={snackbarKey}/>}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
        >
            <ThemeProvider>
                <CssBaseline/>
                <HomePage/>
            </ThemeProvider>
        </SnackbarProvider>

    );
}


function SnackbarCloseButton({snackbarKey}: { snackbarKey: SnackbarKey }) {
    const {closeSnackbar} = useSnackbar();

    return (
        <IconButton onClick={() => closeSnackbar(snackbarKey)}>
            <img src="/icons/close.svg" alt=""/>
        </IconButton>
    );
}

export default App;

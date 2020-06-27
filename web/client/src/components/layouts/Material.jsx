import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { Paper, CssBaseline } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { cyan } from '@material-ui/core/colors';
import { Head } from '../'

export default function MaterialUI(props) {
    const { elements } = props;

    const theme = createMuiTheme({
        palette: {
            type: 'light',
            primary: cyan,
            secondary: cyan
        }
    })

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Head />
            <div className="root">
                <Paper className="paper">{elements}</Paper>
            </div>
            {/* <Footer /> */}
        </ThemeProvider>
    );
}
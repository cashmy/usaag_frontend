// * A wrapper component for the App.js component
// * to allow "easy" migration of MUI v4 - v5
//   > The new version requires that the "ThemeProvider" be wrapped around any component that uses useStyles
//   > Created this component to easily refactor to accommodate this requirement w/o changes App.js excessively

import React, { useState } from "react";
import App from "../App";
import { createTheme, ThemeProvider, StyledEngineProvider } from "@mui/material/styles";

// Theme definitions
const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            dark: "#ad4d18",
            main: "#f86e23",
            light: "#f98b4f",
        },
        secondary: {
            dark: "#00a152",
            main: "#00e676",
            light: "#33eb91",
        },
        tertiary: {
            dark: "#9500ae",
            main: "#d600f9",
            light: "@dd33fa",
        },
        info: {
            dark: "#9e9e9e",
            main: "#bdbdbd",
            light: "#e0e0e0",
        },
    },
});

const lightTheme = createTheme({
    palette: {
        tertiary: {
            dark: "#9500ae",
            main: "#d600f9",
            light: "@dd33fa",
        },
    },
});

export default function AppThemeProvider() {
    const [darkMode, setDarkMode] = useState(true);
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
                <App darkMode={darkMode} setDarkMode={setDarkMode} />
            </ThemeProvider>
        </StyledEngineProvider>
    )
}
import { extendTheme } from "@mui/joy/styles";
import { Inter, Source_Code_Pro } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    adjustFontFallback: false, // prevent NextJS from adding its own fallback font
    fallback: ["var(--joy-fontFamily-fallback)"], // use Joy UI's fallback font
    display: "swap",
});

const sourceCodePro = Source_Code_Pro({
    subsets: ["latin"],
    adjustFontFallback: false, // prevent NextJS from adding its own fallback font
    fallback: [
        // the default theme's fallback for monospace fonts
        "ui-monospace",
        "SFMono-Regular",
        "Menlo",
        "Monaco",
        "Consolas",
        "Liberation Mono",
        "Courier New",
        "monospace",
    ],
    display: "swap",
});

const theme = extendTheme({
    fontFamily: {
        body: inter.style.fontFamily,
        display: inter.style.fontFamily,
        code: sourceCodePro.style.fontFamily,
    },
    components: {
        JoyButton: {
            styleOverrides: {
                root: ({ ownerState }) => ({
                    ...(ownerState.color === "primary" && {
                        backgroundColor: "#4338ca",
                    }),
                }),
            },
        },
        JoyChip: {
            styleOverrides: {
                root: ({ ownerState, theme }) => ({
                    // for the default color scheme (light)
                    boxShadow: theme.vars.shadow.sm,

                    // for the dark color scheme
                    [theme.getColorSchemeSelector("dark")]: {
                        boxShadow: "none",
                    },
                }),
            },
        },
    },
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    "50": "#eef2ff",
                    "100": "#e0e7ff",
                    "200": "#c7d2fe",
                    "300": "#a5b4fc",
                    "400": "#818cf8",
                    "500": "#6366f1",
                    "600": "#4f46e5",
                    "700": "#4338ca",
                    "800": "#3730a3",
                    "900": "#312e81",
                },
            },
        },
        dark: {
            palette: {
                primary: {
                    "50": "#eef2ff",
                    "100": "#e0e7ff",
                    "200": "#c7d2fe",
                    "300": "#a5b4fc",
                    "400": "#818cf8",
                    "500": "#6366f1",
                    "600": "#4f46e5",
                    "700": "#4338ca",
                    "800": "#3730a3",
                    "900": "#312e81",
                },
            },
        },
    },
});

export default theme;

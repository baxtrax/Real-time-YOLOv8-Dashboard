"use client";
import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import NextAppDirEmotionCacheProvider from "./EmotionCache";
import theme from "./theme";

export default function ThemeRegistry({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <NextAppDirEmotionCacheProvider options={{ key: "joy" }}>
            <CssVarsProvider defaultMode="dark" theme={theme}>
                <CssBaseline />
                <GlobalStyles // Using ease in cubic bezier for the transition https://easings.net/#easeInCubic
                    styles={`
                            :root {--darkmode-transition-duration: 0.2s;},
                            * { transition: background-color var(--darkmode-transition-duration) cubic-bezier(0.32, 0, 0.67, 0), 
                                             border-color var(--darkmode-transition-duration) cubic-bezier(0.32, 0, 0.67, 0);
                            },

                            svg { transition: color var(--darkmode-transition-duration) cubic-bezier(0.32, 0, 0.67, 0);}

                            button { transition: background-color var(--darkmode-transition-duration) cubic-bezier(0.32, 0, 0.67, 0), 
                                                 border-color var(--darkmode-transition-duration) cubic-bezier(0.32, 0, 0.67, 0), 
                                                 color var(--darkmode-transition-duration) cubic-bezier(0.32, 0, 0.67, 0),
                                                 box-shadow var(--darkmode-transition-duration) cubic-bezier(0.32, 0, 0.67, 0);},
                            
                            h1, h2, h3, h4, p {transition: color var(--darkmode-transition-duration) cubic-bezier(0.32, 0, 0.67, 0);}`}
                />
                {children}
            </CssVarsProvider>
        </NextAppDirEmotionCacheProvider>
    );
}

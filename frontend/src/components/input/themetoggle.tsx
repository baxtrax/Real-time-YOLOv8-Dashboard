"use client";
import { useColorScheme } from "@mui/joy/styles";
import Switch, { switchClasses } from "@mui/joy/Switch";
import LightMode from "@mui/icons-material/LightMode";

/**
 * ThemeToggle component for rendering a switch input with a light mode icon
 * @returns The ThemeToggle component.
 */
export default function ThemeToggle() {
    const { mode, setMode } = useColorScheme();
    return (
        <Switch
            size="lg"
            slotProps={{
                input: { "aria-label": "Dark mode" },
                thumb: {
                    children: <LightMode />,
                },
            }}
            sx={{
                "--Switch-thumbSize": "16px",
                position: "absolute",
                inset: "auto 0% auto auto",
                height: "2.5rem",
                marginRight: "1rem",
                [`& .${switchClasses.thumb}`]: {
                    transition: "width 0.2s, left 0.2s",
                },
            }}
            onClick={() => {
                // Switches the mode from light to dark and vice versa
                setMode(mode === "dark" ? "light" : "dark");
            }}
        ></Switch>
    );
}

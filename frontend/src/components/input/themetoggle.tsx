"use client";
import { useColorScheme } from "@mui/joy/styles";
import Switch, { switchClasses } from "@mui/joy/Switch";
import LightMode from "@mui/icons-material/LightMode";

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
                setMode(mode === "dark" ? "light" : "dark");
            }}
        ></Switch>
    );
}

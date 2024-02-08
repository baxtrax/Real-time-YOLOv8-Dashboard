import * as React from "react";
import ThemeRegistry from "@components/ThemeRegistry/ThemeRegistry";

export const metadata = {
    title: "YOLOv8 Dashboard",
    description: "A real-time Yolo8 dashboard for object detection",
};

export default function RootLayout(props: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <ThemeRegistry>{props.children}</ThemeRegistry>
            </body>
        </html>
    );
}

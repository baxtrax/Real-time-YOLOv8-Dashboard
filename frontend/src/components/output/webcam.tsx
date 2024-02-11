"use client";

import React, { useRef, useEffect } from "react";

import { AspectRatio, Card } from "@mui/joy";

import { useWebcamContext } from "@/contexts/webcam-context-provider";

const ImageComponent = () => {
    const { devices, getVideoDevices, updateSource, frameURL } =
        useWebcamContext();

    const imageRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        const image = imageRef.current;
        let lastFrameURL: string | null = null;

        const renderFrame = () => {
            if (image && frameURL !== null) {
                if (frameURL !== lastFrameURL) {
                    image.src = frameURL;
                    if (lastFrameURL !== null) {
                        URL.revokeObjectURL(lastFrameURL);
                    }
                    lastFrameURL = frameURL;
                }
            }

            requestAnimationFrame(renderFrame);
        };

        renderFrame(); // Initial render
    }, [frameURL]);

    return <img ref={imageRef} alt="Processed Frame" />;
};

/**
 * WebcamOutput component for showing a webcam stream.
 *
 * @param props - The component props.
 * @returns The rendered WebcamOutput component.
 */
const WebcamOutput = ({}) => {
    // The full component
    const fullComponent = (
        <Card variant="soft" sx={{ width: "100%" }}>
            <AspectRatio ratio="16/9">
                <ImageComponent />
                {/* {frameURL !== null ? (
                    <ImageComponent />
                ) : (
                    <div>
                        <NoPhotographyIcon
                            sx={{ fontSize: "3rem", opacity: 0.2 }}
                        />
                    </div>
                )} */}
                {/* {frameURL !== null ? (
                    <ImageComponent />
                ) : (
                    <div>
                        <NoPhotographyIcon
                            sx={{ fontSize: "3rem", opacity: 0.2 }}
                        />
                    </div>
                )} */}
            </AspectRatio>
        </Card>
    );
    return fullComponent;
};

export default WebcamOutput;

"use client";

import React, { useRef, useEffect, useState } from "react";

import { AspectRatio, Card } from "@mui/joy";

import { useWebcamContext } from "@/contexts/webcam-context-provider";

import NoPhotographyRounded from "@mui/icons-material/NoPhotographyRounded";

const ImageComponent = () => {
    const { isStreamReady } = useWebcamContext();

    const imageRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        const image = imageRef.current;
        console.log("isStreamReady", isStreamReady);

        if (image) {
            image.src =
                "http://localhost:5001/stream-control/webcam?" +
                new Date().getTime();
        }
    }, [isStreamReady]);

    return (
        <img
            ref={imageRef}
            alt="Processed Frame"
            style={{ minHeight: "26rem" }}
        />
    );
};

/**
 * WebcamOutput component for showing a webcam stream.
 *
 * @param props - The component props.
 * @returns The rendered WebcamOutput component.
 */
const WebcamOutput = ({}) => {
    const { isStreamReady } = useWebcamContext();
    const noImageComponent = (
        <AspectRatio ratio="16/9">
            <div>
                <NoPhotographyRounded sx={{ fontSize: "6rem", opacity: 0.2 }} />
            </div>
        </AspectRatio>
    );

    // The full component
    const fullComponent = (
        <Card variant="soft" sx={{ width: "100%" }}>
            {isStreamReady ? <ImageComponent /> : noImageComponent}
            {/* <AspectRatio ratio="16/9">
                <ImageComponent /> */}
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
            {/* </AspectRatio> */}
        </Card>
    );
    return fullComponent;
};

export default WebcamOutput;

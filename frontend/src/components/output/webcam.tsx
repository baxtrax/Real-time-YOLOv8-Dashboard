"use client";

import React, { useRef, useEffect, useState } from "react";

import { AspectRatio, Card } from "@mui/joy";

import { useWebcamContext } from "@/contexts/webcam-context-provider";

import NoPhotographyRounded from "@mui/icons-material/NoPhotographyRounded";

const ImageComponent = () => {
    const { isStreamReady, isImageLoaded, setIsImageLoaded } =
        useWebcamContext();

    const imageRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        const image = imageRef.current;
        console.log("isStreamReady", isStreamReady);

        if (image) {
            if (isStreamReady) {
                image.src = "http://localhost:5001/stream-control/webcam";
            } else {
                image.src = "";
            }
        }
    }, [isStreamReady]);

    return <img key={Date.now()} ref={imageRef} alt="Processed Frame" />;
};

/**
 * WebcamOutput component for showing a webcam stream.
 *
 * @param props - The component props.
 * @returns The rendered WebcamOutput component.
 */
const WebcamOutput = ({}) => {
    const { isStreamReady, isImageLoaded } = useWebcamContext();
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

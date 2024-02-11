"use client";

import React, { useRef, useEffect } from "react";

import { AspectRatio, Card } from "@mui/joy";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";

import { useWebcamContext } from "@/contexts/webcam-context-provider";

interface ImageComponentProps {
    imageData: ImageData;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ imageData }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        const ctx = canvas.getContext("2d");

        const renderFrame = () => {
            if (imageData) {
                ctx!.putImageData(imageData, 0, 0);
            }

            requestAnimationFrame(renderFrame);
        };

        renderFrame(); // Initial render
    }, [imageData]);

    return <canvas ref={canvasRef} width={640} height={480} />;
};

/**
 * WebcamOutput component for showing a webcam stream.
 *
 * @param props - The component props.
 * @returns The rendered WebcamOutput component.
 */
const WebcamOutput = ({}) => {
    const { frame } = useWebcamContext();

    // The full component
    const fullComponent = (
        <Card variant="soft" sx={{ width: "100%" }}>
            <AspectRatio ratio="16/9">
                {frame !== null ? (
                    <ImageComponent imageData={frame} />
                ) : (
                    <div>
                        <NoPhotographyIcon
                            sx={{ fontSize: "3rem", opacity: 0.2 }}
                        />
                    </div>
                )}
            </AspectRatio>
        </Card>
    );
    return fullComponent;
};

export default WebcamOutput;

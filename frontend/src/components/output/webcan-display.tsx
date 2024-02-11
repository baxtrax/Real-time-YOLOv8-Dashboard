const ImageComponent = ({ imageData }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const renderFrame = () => {
            if (imageData) {
                const width = 640; // Replace with the actual width
                const height = 480; // Replace with the actual height

                const imageDataObject = new ImageData(
                    new Uint8ClampedArray(imageData),
                    width,
                    height
                );

                ctx.putImageData(imageDataObject, 0, 0);
            }

            requestAnimationFrame(renderFrame);
        };

        renderFrame(); // Initial render
    }, [imageData]);

    return <canvas ref={canvasRef} width={640} height={480} />;
};

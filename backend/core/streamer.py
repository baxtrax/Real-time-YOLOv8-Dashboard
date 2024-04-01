from flask import Response
from core.utils import LOGGER
import cv2


class Streamer:
    def __init__(self):
        self.video_device = None
        self.stream = None
        self.running = False

    def start(self):
        LOGGER.info("Starting video stream")
        if self.video_device is None:
            LOGGER.error("Video device not set.")
            return

        if not self.running:
            self.running = True
            self.stream = cv2.VideoCapture(int(self.video_device))

    def stop(self):
        LOGGER.info("Stopping video stream")
        self.running = False
        if self.stream is not None:
            self.stream.release()
            self.stream = None

    def set_video_device(self, device):
        self.stop()
        LOGGER.debug(f"Setting video device to {device}")
        self.video_device = device
        self.start()

    def generate_frames(self):
        while self.running:
            ret, frame = self.stream.read()

            if not ret:
                LOGGER.error("Unable to read frame.")
                break

            success, encoded_frame = cv2.imencode('.jpg', frame)
            if not success:
                LOGGER.error("Unable to encode frame.")
                break

            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' +
                   encoded_frame.tobytes() + b'\r\n')

    def get_video_devices(self):
        # @TODO: Limitation on device names, dependent on OS specific backend logic.
        # Curse you cross compatibility!

        # Get video devices, if failure to open device, increment index
        # Will attempt up until 5 open failures before giving up
        devices = {}
        index = 0
        failures = 0
        while failures < 5:
            print(index)

            cap = cv2.VideoCapture(index)
            if not cap.isOpened():
                failures += 1
                index += 1
                continue

            LOGGER.debug(f"Device {index}: Camera {index}")
            devices[index] = f"Camera {index}"
            cap.release()
            index += 1
        return devices

    def stream_video(self):
        return Response(self.generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


STREAMER = Streamer()

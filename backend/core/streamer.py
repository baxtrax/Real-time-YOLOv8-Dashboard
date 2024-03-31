import cv2
import threading
from core.utils import LOGGER
from core.predictor import PREDICTOR
import base64

DEBUG_STREAM = False


class Streamer:
    def __init__(self):
        self.video_device = None  # Default video device
        self.stream = None
        self.stream_thread = None
        self.running = False
        self.config = {}

    def start(self):
        if self.video_device is None:
            LOGGER.critical("Error: Video device not set.")
            return

        if not self.running:
            self.running = True
            self.stream_thread = threading.Thread(
                target=self._start_stream, daemon=True)
            self.stream_thread.start()

    def stop(self):
        LOGGER.info("Stopping video stream")
        self.running = False
        if self.stream_thread is not None:
            self.stream_thread.join()
            self.stream_thread = None
            self.stream = None
            LOGGER.debug("Stream thread has stopped")

    def set_video_device(self, device):
        self.stop()
        LOGGER.debug(f"Setting video device to {device}")
        self.video_device = device
        self.start()

    def set_socket(self, socket):
        self.socket = socket

    def configure(self, config):
        self.config = config

    def emit_frame(self, frame):
        _, frame_encoded = cv2.imencode('.png', frame)
        frame = frame_encoded.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    def _start_stream(self):

        # Setup video stream
        thread_name = threading.current_thread().name
        LOGGER.info(
            f"(Stream Thread: {thread_name}) Starting video stream from device {self.video_device}")

        self.stream = cv2.VideoCapture(int(self.video_device))

        if not self.stream.isOpened():
            LOGGER.error(
                f"(Stream Thread: {thread_name}) Unable to open video stream.")
            self.running = False
            return

        # Stream loop
        while self.running:
            ret, frame = self.stream.read()

            if not ret:
                LOGGER.error(
                    f"(Stream Thread: {thread_name}) Unable to read frame.")
                break

            # Pass frame to processing method
            self.emit_frame(PREDICTOR.predict(frame))

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        # Cleanup after stream loop ends
        LOGGER.debug(f"(Stream Thread: {thread_name}) Releasing video stream")
        self.stream.release()
        cv2.destroyAllWindows()

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


STREAMER = Streamer()

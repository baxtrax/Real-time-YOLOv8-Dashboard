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
        base64_encoded = base64.b64encode(frame_encoded)
        base64_encoded = base64_encoded.decode('utf-8')
        self.socket.emit('processed_frame', base64_encoded)

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


STREAMER = Streamer()

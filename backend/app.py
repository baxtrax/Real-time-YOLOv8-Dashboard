from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS
import cv2
import numpy as np
import base64
import threading
import time

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Global variable to hold the most recent frame
latest_frame = None
running = True

time_recv_last_frame = time.time()


def display_frames():
    global latest_frame
    while running:
        if latest_frame is not None:
            cv2.imshow('Frame', latest_frame)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
    cv2.destroyAllWindows()


# Start the thread for displaying frames
display_thread = threading.Thread(target=display_frames)
display_thread.daemon = True
display_thread.start()


@socketio.on('frame')
def handle_frame(data):
    global latest_frame
    global time_recv_last_frame

    # Decode base64 img to cv2 img
    data = data.split(',')[1]
    data = base64.b64decode(data)

    nparr = np.frombuffer(data, dtype=np.uint8)
    frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # Draw a circle on the frame
    cv2.circle(frame, (100, 100), 50, (0, 255, 0), 2)

    # Display the frame locally
    latest_frame = frame
    current_time = time.time()
    framerate = (1 / (current_time - time_recv_last_frame))
    print(f'Framerate: {framerate:.2f} fps')

    time_recv_last_frame = current_time

    # Encode the modified frame as png to base64 and emit as string back to the client
    # _, frame_encoded = cv2.imencode('.png', frame)
    # base64_encoded = base64.b64encode(frame_encoded)
    # base64_encoded = base64_encoded.decode('utf-8')

    # socketio.emit('processed_frame', base64_encoded)


if __name__ == '__main__':
    socketio.run(app, port=5001)

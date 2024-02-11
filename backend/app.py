from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS
import cv2
import numpy as np

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")


@socketio.on('frame')
def handle_frame(blob):
    # Convert binary data to numpy array
    nparr = np.frombuffer(blob, dtype=np.uint8)
    frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # Draw a circle on the frame
    cv2.circle(frame, (100, 100), 50, (0, 255, 0), 2)

    # Encode the modified frame as binary
    _, frame_encoded = cv2.imencode('.jpeg', frame)
    modified_blob = frame_encoded.tobytes()

    # Send back the processed data if required
    socketio.emit('processed_frame', modified_blob)


if __name__ == '__main__':
    socketio.run(app, port=5001)

from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_restx import Api, Resource

from core.streamer import STREAMER
from apis.model_settings_api import API as MODEL_SETTINGS_API
from apis.stream_control_api import API as STREAM_CONTROL_API
from apis.heartbeat_api import API as HEARTBEAT_API

APP = Flask(__name__)
CORS(APP)
SOCKETIO = SocketIO(APP, cors_allowed_origins="*")


def main():

    # Disable X-Fields in Swagger (Maybe remove this later)
    APP.config.RESTX_MASK_SWAGGER = False
    APP.config.SWAGGER_UI_REQUEST_DURATION = True

    # Start the Flask app with Socket.IO
    api = setup_api(APP)

    SOCKETIO.run(APP, port=5001)


def setup_api(app):
    api = Api(app, version='1.0', title='Backend API',
              description='Holds the backend API calls available to the frontend')

    # Add namespaces to the API
    api.add_namespace(MODEL_SETTINGS_API)
    api.add_namespace(STREAM_CONTROL_API)
    api.add_namespace(HEARTBEAT_API)

    return api


@SOCKETIO.on('connect')
def handle_connect():
    print('Client connected')


@SOCKETIO.on('disconnect')
def handle_disconnect():
    print('Client disconnected')


if __name__ == '__main__':
    main()

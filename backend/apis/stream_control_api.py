from flask import request
from flask_restx import Namespace, Resource, reqparse, fields
from core.streamer import STREAMER

# Define namespace
API = Namespace('Stream Control',
                description='Handles Stream Control operations',
                path='/stream-control')


@API.route('/stop-stream')
@API.doc(description='Stop the video stream')
class StopStream(Resource):
    def post(self):
        STREAMER.stop()
        return {'message': 'Video stream stopped'}, 200


@API.route('/start-stream')
@API.doc(description='Start the video stream')
class StartStream(Resource):
    def post(self):
        STREAMER.start()
        return {'message': 'Video stream started'}, 200


@API.route('/webcam')
class WebcamDisplay(Resource):
    @API.doc(description='Stream video from webcam', responses={200: 'OK'})
    @API.produces(['multipart/x-mixed-replace; boundary=frame'])
    def get(self):
        return STREAMER.stream_video()

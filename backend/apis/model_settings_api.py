from flask import request
from flask_restx import Namespace, Resource, reqparse, fields
from core.streamer import STREAMER

# Define namespace
API = Namespace('Model Settings',
                description='Handles Model Settings operations',
                path='/model-settings')


def validate_query(value, name):
    if value is None or value == '':
        raise ValueError("Query parameter '{}' is required".format(name))
    return value


# Parsers
set_model_parser = reqparse.RequestParser()
set_model_parser.add_argument(
    'video_device',
    type=str,
    required=True,
    help='The video device to use for the stream')


# Models
get_model_sources_response_model = API.model('Model Sources', {
    'video_devices': fields.Raw(description='Dictionary of video devices. \
                                             Keys are camera IDs (integers), \
                                             and values are camera \
                                             names (strings).',
                                example={0: 'Camera 0',
                                         2: 'Camera 2'})
})


# Define routes
@API.route('/set-model-source')
@API.doc(description='Set the video device to use for the stream')
class SetModelSource(Resource):
    @API.expect(set_model_parser, validate=True)
    def post(self):
        args = set_model_parser.parse_args()
        video_device = args['video_device']
        if video_device is None:
            return {'message': 'video-device parameter is required'}, 400

        STREAMER.set_video_device(video_device)
        return {'message': f'Video device set to {video_device}'}, 200


@API.route('/get-model-sources')
@API.doc(description='Get the available video devices')
class GetModelSources(Resource):
    @API.marshal_with(get_model_sources_response_model)
    def get(self):
        return {'video_devices': STREAMER.get_video_devices()}, 200

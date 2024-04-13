from flask import request
from flask_restx import Namespace, Resource, reqparse, fields
import core.utils as utils
from core.streamer import STREAMER
from core.predictor import PREDICTOR

# Define namespace
API = Namespace('Model Settings',
                description='Handles Model Settings operations',
                path='/model-settings')


# Define routes & parsers

set_model_source_parser = reqparse.RequestParser()
set_model_source_parser.add_argument(
    'video_device',
    type=utils.validate_query,
    required=True,
    help='The video device to use for the stream')


@API.route('/set-model-source')
@API.doc(description='Update/Set the video device to use for the stream')
class SetModelSource(Resource):
    @API.expect(set_model_source_parser, validate=True)
    def patch(self):
        args = set_model_source_parser.parse_args()
        video_device = args['video_device']
        STREAMER.set_video_device(video_device)
        return {'message': f'Video device set to {video_device}'}, 200


set_model_size_parser = reqparse.RequestParser()
set_model_size_parser.add_argument(
    'size',
    type=utils.validate_query,
    required=True,
    help='The size of the model used for prediction. Must be one of: n, s, m, l, x.')


@API.route('/set-model-size')
@API.doc(description='Update/Set the model size used for prediction')
class SetModelSize(Resource):
    @API.expect(set_model_size_parser, validate=True)
    def patch(self):
        args = set_model_size_parser.parse_args()
        size = args['size']
        if size not in ['n', 's', 'm', 'l', 'x']:
            return {'message': 'size parameter must be one of: n, s, m, l, x'}, 400

        PREDICTOR.set_model_size(size)
        return {'message': f'Model size set to {size}'}, 200


set_confidence_parser = reqparse.RequestParser()
set_confidence_parser.add_argument(
    'confidence',
    type=float,
    required=True,
    help='The confidence to filter out')


@API.route('/set-confidence-filter')
@API.doc(description='Update/Set the confidence filter to filter out low confidences')
class SetConfidence(Resource):
    @API.expect(set_confidence_parser, validate=True)
    def patch(self):
        args = set_confidence_parser.parse_args()
        confidence = args['confidence']

        PREDICTOR.set_confidence_filter(confidence)
        return {'message': f'Confidence filter set to {confidence}'}, 200


set_iou_parser = reqparse.RequestParser()
set_iou_parser.add_argument(
    'iou',
    type=float,
    required=True,
    help='The IOU passed into NMS calculation')


@API.route('/set-iou-filter')
@API.doc(description='Update/Set the IOU filter to alter IOU threshold of NMS')
class SetIOU(Resource):
    @API.expect(set_iou_parser, validate=True)
    def patch(self):
        args = set_iou_parser.parse_args()
        iou = args['iou']

        PREDICTOR.set_iou_filter(iou)
        return {'message': f'IOU filter set to {iou}'}, 200


get_model_sources_response_model = API.model('Model Sources', {
    'video_devices': fields.Raw(description='Dictionary of video devices. \
                                             Keys are camera IDs (integers), \
                                             and values are camera \
                                             names (strings).',
                                example={0: 'Camera 0',
                                         2: 'Camera 2'})
})


@API.route('/get-model-sources')
@API.doc(description='Get the available video devices')
class GetModelSources(Resource):
    @API.marshal_with(get_model_sources_response_model)
    def get(self):
        return {'video_devices': STREAMER.get_video_devices()}, 200


set_class_filter_model = API.model('Class Filter List', {
    'class_list': fields.List(fields.Integer,
                              description='List of class index ids. \
                                             Indices are integers',
                              example=[0, 1, 23, 58],
                              required=True)
})


@API.route('/set-class-filter')
@API.doc(description='Update/Set the Class filter to alter filter for only classes specified')
class SetClassFilter(Resource):
    @API.expect(set_class_filter_model, validate=True)
    def patch(self):
        data = request.json
        class_list = data['class_list']
        if len(class_list) == 0:
            class_list = None

        PREDICTOR.set_class_filter(class_list)
        return {'message': f'Class filter set to {class_list}'}, 200

from flask import request
from flask_restx import Namespace, Resource, reqparse, fields
import core.utils as utils
from core.predictor import PREDICTOR


# Define namespace
API = Namespace('Feature Specific Settings',
                description='Handles Feature Specific Settings operations',
                path='/feature-specific-settings')


set_heatmap_method_parser = reqparse.RequestParser()
set_heatmap_method_parser.add_argument(
    'method',
    type=utils.validate_query,
    required=True,
    help='The heatmap generation method to be used. Must be one of: track')


@API.route('/heatmap/set-method')
@API.doc(description='Update/Set the heatmap generation method to create visualizations')
class SetHeatmapMethod(Resource):
    @API.expect(set_heatmap_method_parser, validate=True)
    def patch(self):
        args = set_heatmap_method_parser.parse_args()
        method = args['method']
        if method not in ['track']:
            return {'message': 'method parameter must be one of: track'}, 400

        # TODO: Implement logic
        return {'message': f'Heatmap Method set to {method}'}, 200


set_heatmap_decay = reqparse.RequestParser()
set_heatmap_decay.add_argument(
    'decay',
    type=float,
    required=True,
    help='The decay applied to heatmap generation')


@API.route('/heatmap/set-decay')
@API.doc(description='Update/Set the decay factor applied to heatmap generation')
class SetHeatmapDecay(Resource):
    @API.expect(set_heatmap_decay, validate=True)
    def patch(self):
        args = set_heatmap_decay.parse_args()
        decay = args['decay']

        PREDICTOR.update_heatmap_args(decay_factor=decay)
        return {'message': f'Heatmap decay set to {decay}'}, 200


set_heatmap_alpha = reqparse.RequestParser()
set_heatmap_alpha.add_argument(
    'alpha',
    type=float,
    required=True,
    help='The alpha applied to heatmap generation')


@API.route('/heatmap/set-alpha')
@API.doc(description='Update/Set the alpha factor applied to heatmap generation')
class SetHeatmapAlpha(Resource):
    @API.expect(set_heatmap_alpha, validate=True)
    def patch(self):
        args = set_heatmap_alpha.parse_args()
        alpha = args['alpha']

        PREDICTOR.update_heatmap_args(heatmap_alpha=alpha)
        return {'message': f'Heatmap alpha set to {alpha}'}, 200


set_tracking_method_parser = reqparse.RequestParser()
set_tracking_method_parser.add_argument(
    'method',
    type=utils.validate_query,
    required=True,
    help='The tracking method to be used. Must be one of: botsort, bytetrack')


@API.route('/tracking/set-method')
@API.doc(description='Update/Set the tracking method used to predict tracks')
class SetTrackingMethod(Resource):
    @API.expect(set_tracking_method_parser, validate=True)
    def patch(self):
        args = set_tracking_method_parser.parse_args()
        method = args['method']
        if method not in ['botsort', 'bytetrack']:
            return {'message': 'method parameter must be one of: botsort, bytetrack'}, 400

        PREDICTOR.set_tracking_method(method)
        return {'message': f'Tracking Method set to {method}'}, 200


set_tracking_length = reqparse.RequestParser()
set_tracking_length.add_argument(
    'length',
    type=int,
    required=True,
    help='The length of the tracking tail')


@API.route('/tracking/set-length')
@API.doc(description='Update/Set the tracking tail length displayed')
class SetTrackingLength(Resource):
    @API.expect(set_tracking_length, validate=True)
    def patch(self):
        args = set_tracking_length.parse_args()
        length = args['length']

        PREDICTOR.update_tracking_args(tail_length=length)
        return {'message': f'Tracking tail length set to {length}'}, 200


set_tracking_thickness = reqparse.RequestParser()
set_tracking_thickness.add_argument(
    'thickness',
    type=int,
    required=True,
    help='The thickness of the tracking tail')


@API.route('/tracking/set-thickness')
@API.doc(description='Update/Set the tracking tail thickness displayed')
class SetTracking(Resource):
    @API.expect(set_tracking_thickness, validate=True)
    def patch(self):
        args = set_tracking_thickness.parse_args()
        thickness = args['thickness']

        PREDICTOR.update_tracking_args(tail_thickness=thickness)
        return {'message': f'Tracking tail thickness set to {thickness}'}, 200

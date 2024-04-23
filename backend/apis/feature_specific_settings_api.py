from flask import request
from flask_restx import Namespace, Resource, reqparse, fields
import core.utils as utils

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

        # TODO: Implement logic
        return {'message': f'Heatmap decay set to {decay}'}, 200

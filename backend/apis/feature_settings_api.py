from flask import request
from flask_restx import Namespace, Resource, reqparse, fields

# Define namespace
API = Namespace('Feature Settings',
                description='Handles Feature Settings operations',
                path='/feature-settings')


# Define routes & parsers

set_confidence_feature_parser = reqparse.RequestParser()
set_confidence_feature_parser.add_argument(
    'enabled',
    type=bool,
    required=True,
    help='Whether Confidence Hinting feature is enabled')


@API.route('/set-confidence-feature')
@API.doc(description='Enable/Disable the Confidence Hinting feature')
class SetConfidenceFeature(Resource):
    @API.expect(set_confidence_feature_parser, validate=True)
    def patch(self):
        args = set_confidence_feature_parser.parse_args()
        enabled = args['enabled']

        # TODO: Handle feature enabling logic
        return {'message': f'Confidence Hiting feature is set to {enabled}'}, 200


set_feature_heads_feature_parser = reqparse.RequestParser()
set_feature_heads_feature_parser.add_argument(
    'enabled',
    type=bool,
    required=True,
    help='Whether visualization of Feature Heads feature is enabled')


@API.route('/set-feature-heads-feature')
@API.doc(description='Enable/Disable the visualization of Feature Heads feature is enabled')
class SetFeatureHeadsFeature(Resource):
    @API.expect(set_feature_heads_feature_parser, validate=True)
    def patch(self):
        args = set_feature_heads_feature_parser.parse_args()
        enabled = args['enabled']

        # TODO: Handle feature enabling logic
        return {'message': f'Feature Heads visualization feature is set to {enabled}'}, 200


set_heatmap_feature_parser = reqparse.RequestParser()
set_heatmap_feature_parser.add_argument(
    'enabled',
    type=bool,
    required=True,
    help='Whether visualization of heatmaps feature is enabled')


@API.route('/set-heatmaps-feature')
@API.doc(description='Enable/Disable the visualization of heatmaps feature is enabled')
class SetHeatmapFeature(Resource):
    @API.expect(set_heatmap_feature_parser, validate=True)
    def patch(self):
        args = set_heatmap_feature_parser.parse_args()
        enabled = args['enabled']

        # TODO: Handle feature enabling logic
        return {'message': f'Heatmap visualization feature is set to {enabled}'}, 200


set_tracking_feature_parser = reqparse.RequestParser()
set_tracking_feature_parser.add_argument(
    'enabled',
    type=bool,
    required=True,
    help='Whether visualization of track paths feature is enabled')


@API.route('/set-tracking-feature')
@API.doc(description='Enable/Disable the visualization of track paths feature is enabled')
class SetTrackingFeature(Resource):
    @API.expect(set_tracking_feature_parser, validate=True)
    def patch(self):
        args = set_tracking_feature_parser.parse_args()
        enabled = args['enabled']

        # TODO: Handle feature enabling logic
        return {'message': f'Tracking visualization feature is set to {enabled}'}, 200


set_pose_feature_parser = reqparse.RequestParser()
set_pose_feature_parser.add_argument(
    'enabled',
    type=bool,
    required=True,
    help='Whether visualization of poses feature is enabled')


@API.route('/set-pose-feature')
@API.doc(description='Enable/Disable the visualization of poses feature is enabled')
class SetPoseFeature(Resource):
    @API.expect(set_pose_feature_parser, validate=True)
    def patch(self):
        args = set_pose_feature_parser.parse_args()
        enabled = args['enabled']

        # TODO: Handle feature enabling logic
        return {'message': f'Poses visualization feature is set to {enabled}'}, 200


set_segmentation_feature_parser = reqparse.RequestParser()
set_segmentation_feature_parser.add_argument(
    'enabled',
    type=bool,
    required=True,
    help='Whether visualization of segmentation maps feature is enabled')


@API.route('/set-segmentation-feature')
@API.doc(description='Enable/Disable the visualization of segmentation maps feature is enabled')
class SetSegmentationFeature(Resource):
    @API.expect(set_segmentation_feature_parser, validate=True)
    def patch(self):
        args = set_segmentation_feature_parser.parse_args()
        enabled = args['enabled']

        # TODO: Handle feature enabling logic
        return {'message': f'Segmentation maps visualization feature is set to {enabled}'}, 200

from flask_restx import Namespace, Resource

# Define namespace
API = Namespace('Heartbeat',
                description='Handles operations related to API health',
                path='/heartbeat')


@API.route('/pulse')
@API.doc(description='Check the pulse of the API')
class Pulse(Resource):
    def get(self):
        return {'status': 'alive'}, 200

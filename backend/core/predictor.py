from ultralytics import YOLO
import core.utils as utils
import numpy as np


class Predictor():
    def __init__(self) -> None:
        self.model = YOLO('yolov8n.pt')
        self.conf = 0.25
        self.iou = 0.7
        self.class_filter = None
        self.agnostic_nms = False
        self.tracking = False
        self.fps_moving_avg = utils.MovingAverage(10)
        self.pre_moving_avg = utils.MovingAverage(10)
        self.inf_moving_avg = utils.MovingAverage(10)
        self.post_moving_avg = utils.MovingAverage(10)

    def predict(self, frame):
        prediction_method = self.model.track if self.tracking else self.model.predict
        results = (prediction_method)(frame,
                                      conf=self.conf,
                                      iou=self.iou,
                                      classes=self.class_filter,
                                      agnostic_nms=self.agnostic_nms,
                                      verbose=False)

        if self.socketio:
            self.socketio.emit('metrics', self.calculate_metrics(results))
            self.socketio.emit('predictions', self.get_top_k_results(results))

        return self.handle_visualization(results)

    def handle_visualization(self, results):
        return results[0].plot()

    def calculate_metrics(self, results):
        # Calculate FPS
        pre_ms = self.pre_moving_avg.next(results[0].speed['preprocess'])
        inf_ms = self.inf_moving_avg.next(results[0].speed['inference'])
        post_ms = self.post_moving_avg.next(results[0].speed['postprocess'])

        curr_fps = 1000 / (results[0].speed['preprocess'] +
                           results[0].speed['inference'] +
                           results[0].speed['postprocess'])
        avg_fps = self.fps_moving_avg.next(curr_fps)

        return {'preprocess': pre_ms,
                'inference': inf_ms,
                'postprocess': post_ms,
                'num_detected_objs': len(results[0].boxes.conf),
                'fps': avg_fps, }

    def get_top_k_results(self, results):
        confs = results[0].boxes.conf
        length = min(confs.size()[0], 5)
        top_k, indexes = confs.topk(length, sorted=True)

        # Create conf - class dictionary
        class_conf_dict = {}
        for i in range(length):
            class_index = results[0].boxes.cls[indexes[i]].item()
            class_name = results[0].names[class_index]
            conf = top_k[i].item()

            # Only update if the class is not already in the dictionary
            if class_name not in class_conf_dict:
                class_conf_dict[class_name] = conf

        return class_conf_dict

    def set_model_size(self, size):
        self.model = YOLO(f'yolov8{size}.pt')

    def set_socketio(self, socketio):
        self.socketio = socketio


PREDICTOR = Predictor()

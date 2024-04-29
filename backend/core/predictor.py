from ultralytics import YOLO
from collections import defaultdict
import core.utils as utils
import numpy as np
import cv2


class Predictor():
    def __init__(self) -> None:
        self.model = YOLO('yolov8n.pt')
        self.conf = 0.25
        self.iou = 0.7
        self.class_filter = None
        self.agnostic_nms = False
        self.method = 'tracking'
        self.tracking_hist = defaultdict(lambda: [])
        self.fps_moving_avg = utils.MovingAverage(10)
        self.pre_moving_avg = utils.MovingAverage(10)
        self.inf_moving_avg = utils.MovingAverage(10)
        self.post_moving_avg = utils.MovingAverage(10)

    def predict(self, frame):
        match self.method:
            case 'tracking':
                prediction_method = self.model.track
            case _:
                prediction_method = self.model.predict

        # Map the prediction method to the correct
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
        if self.tracking and results[0].boxes.id is not None:
            # Grab the boxes and track ids
            boxes = results[0].boxes.xywh.cpu()
            track_ids = results[0].boxes.id.int().cpu().tolist()

            # Plot bboxes like normal
            annotated_frame = results[0].plot()

            # Plot tracking lines
            for box, track_id in zip(boxes, track_ids):
                x, y, w, h = box
                track = self.tracking_hist[track_id]  # Get hist for id
                track.append((float(x), float(y)))  # Update history
                if len(track) > 30:  # Length of track
                    track.pop(0)

                # Draw the tracking lines
                points = np.hstack(track).astype(
                    np.int32).reshape((-1, 1, 2))
                cv2.polylines(annotated_frame, [points], isClosed=False, color=(
                    241, 102, 99), thickness=5)

            return annotated_frame
        else:
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

    def set_tracking(self, enabled):
        if enabled:
            self.method = 'tracking'
        else:
            self.method = ''  # Default bbox
        # Force reset to fix tracking bug
        self.model = YOLO(self.model.ckpt_path)


PREDICTOR = Predictor()

from ultralytics import YOLO
from core.heatmap import PatchedHeatmap
from collections import defaultdict
import core.utils as utils
import numpy as np
import cv2


class Predictor():
    def __init__(self) -> None:
        self.size = 'n'
        self.model = YOLO(f'yolov8{self.size}.pt')
        self.conf = 0.25
        self.iou = 0.7
        self.class_filter = None
        self.agnostic_nms = False
        self.method = ''
        self.tracking_method = 'botsort.yaml'
        self.tracking_args = dict(tail_length=30,
                                  tail_thickness=5,)
        self.tracking_hist = defaultdict(lambda: [])
        self.heatmap = None
        self.heatmap_args = dict(colormap=cv2.COLORMAP_JET,
                                 view_img=False,
                                 shape="circle",
                                 classes_names=self.model.names,
                                 imw=640,
                                 imh=480,
                                 heatmap_alpha=0.5,
                                 decay_factor=0.99,)
        self.fps_moving_avg = utils.MovingAverage(10)
        self.pre_moving_avg = utils.MovingAverage(10)
        self.inf_moving_avg = utils.MovingAverage(10)
        self.post_moving_avg = utils.MovingAverage(10)

    def predict(self, frame):
        match self.method:
            case 'tracking' | 'heatmap':
                results = self.model.track(frame,
                                           conf=self.conf,
                                           iou=self.iou,
                                           classes=self.class_filter,
                                           agnostic_nms=self.agnostic_nms,
                                           verbose=False,
                                           tracker=self.tracking_method)
            case _:
                results = self.model.predict(frame,
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
        if self.method == 'tracking' and results[0].boxes.id is not None:
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

                # Length of track
                if len(track) > self.tracking_args['tail_length']:
                    track.pop(0)

                # Draw the tracking lines
                points = np.hstack(track).astype(
                    np.int32).reshape((-1, 1, 2))
                cv2.polylines(annotated_frame, [points], isClosed=False, color=(
                    241, 102, 99), thickness=self.tracking_args['tail_thickness'])

            return annotated_frame

        elif self.method == 'heatmap' and results[0].boxes.id is not None:
            new_img = self.heatmap.generate_heatmap(
                results[0].orig_img, results[0])
            return new_img
        elif self.method == '':
            return results[0].plot()
        else:
            return results[0].orig_img

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
        self.size = size
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

    def set_pose(self, enabled):
        if enabled:
            self.model = YOLO(f'yolov8{self.size}-pose.pt')
        else:
            self.model = YOLO(f'yolov8{self.size}.pt')

    def set_seg(self, enabled):
        if enabled:
            self.model = YOLO(f'yolov8{self.size}-seg.pt')
        else:
            self.model = YOLO(f'yolov8{self.size}.pt')

    def set_heatmap(self, enabled):
        if enabled:
            self.method = 'heatmap'
            self.heatmap = PatchedHeatmap()
            self.heatmap.set_args(**self.heatmap_args)
        else:
            self.method = ''
            self.heatmap = None

    def update_heatmap_args(self, **kwargs):
        if self.heatmap:
            # Update heatmap_args with updated args if present
            for key, value in kwargs.items():
                if key in self.heatmap_args:
                    self.heatmap_args[key] = value

            self.heatmap.set_args(**self.heatmap_args)

    def set_tracking_method(self, method):
        self.tracking_method = f'{method}.yaml'

    def update_tracking_args(self, **kwargs):
        for key, value in kwargs.items():
            if key in self.tracking_args:
                self.tracking_args[key] = value


PREDICTOR = Predictor()

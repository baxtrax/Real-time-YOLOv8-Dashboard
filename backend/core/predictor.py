from ultralytics import YOLO


class Predictor():
    def __init__(self) -> None:
        self.model = YOLO('yolov8n.pt')
        self.conf = 0.25
        self.iou = 0.7
        self.class_filter = None
        self.agnostic_nms = False

    def predict(self, frame):
        results = self.model.predict(frame,
                                     conf=self.conf,
                                     iou=self.iou,
                                     classes=self.class_filter,
                                     agnostic_nms=self.agnostic_nms,
                                     verbose=False)

        # Round speeds to 2 decimal places
        for key in results[0].speed.keys():
            results[0].speed[key] = round(results[0].speed[key], 2)

        # Includes preprocess, inference, and postprocess speeds, fps, and num detections
        self.metrics = {**results[0].speed,
                        'num_detected_objs': len(results[0].boxes.conf),
                        'fps': round(1000 / sum([results[0].speed[key] for key in results[0].speed.keys()]))}

        if self.socketio:
            self.socketio.emit('metrics', self.metrics)

        annotated_frame = results[0].plot()
        return annotated_frame

    def set_confidence_filter(self, confidence):
        self.conf = confidence

    def set_iou_filter(self, iou):
        self.iou = iou

    def set_model_size(self, size):
        self.model = YOLO(f'yolov8{size}.pt')

    def set_class_filter(self, class_filter):
        self.class_filter = class_filter

    def set_agnsotic_mode(self, agnostic):
        self.agnostic_nms = agnostic

    def set_socketio(self, socketio):
        self.socketio = socketio


PREDICTOR = Predictor()

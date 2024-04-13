from ultralytics import YOLO


class Predictor():
    def __init__(self) -> None:
        self.model = YOLO('yolov8n.pt')
        self.conf = 0.5
        self.iou = 0.7
        self.class_filter = None

    def predict(self, frame):
        results = self.model.predict(frame,
                                     conf=self.conf,
                                     iou=self.iou,
                                     classes=self.class_filter,
                                     verbose=False)
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


PREDICTOR = Predictor()

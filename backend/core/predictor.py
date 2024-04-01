from ultralytics import YOLO


class Predictor():
    def __init__(self) -> None:
        self.model = YOLO('yolov9c.pt')

        pass

    def predict(self, frame):
        results = self.model.predict(frame)
        annotated_frame = results[0].plot()
        return annotated_frame


PREDICTOR = Predictor()

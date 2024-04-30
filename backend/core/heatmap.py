# Ultralytics YOLO 🚀, AGPL-3.0 license

from collections import defaultdict
from ultralytics.solutions import heatmap


class PatchedHeatmap(heatmap.Heatmap):
    """
        A class to draw heatmaps in real-time video stream based on their tracks.
        Patched variation to fix invalid imshow checks.
    """

    def __init__(self):
        """Initializes the heatmap class with default values for Visual, Image, track, count and heatmap parameters."""

        # Visual information
        self.annotator = None
        self.view_img = False
        self.shape = "circle"

        self.names = None  # Classes names

        # Image information
        self.imw = None
        self.imh = None
        self.im0 = None
        self.tf = 2
        self.view_in_counts = True
        self.view_out_counts = True

        # Heatmap colormap and heatmap np array
        self.colormap = None
        self.heatmap = None
        self.heatmap_alpha = 0.5

        # Predict/track information
        self.boxes = None
        self.track_ids = None
        self.clss = None
        self.track_history = defaultdict(list)

        # Region & Line Information
        self.count_reg_pts = None
        self.counting_region = None
        self.line_dist_thresh = 15
        self.region_thickness = 5
        self.region_color = (255, 0, 255)

        # Object Counting Information
        self.in_counts = 0
        self.out_counts = 0
        self.count_ids = []
        self.class_wise_count = {}
        self.count_txt_color = (0, 0, 0)
        self.count_bg_color = (255, 255, 255)
        self.cls_txtdisplay_gap = 50

        # Decay factor
        self.decay_factor = 0.99
        self.env_check = True  # Bypass environment check

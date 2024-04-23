import logging
from collections import deque

# Create a logger instance
LOGGER = logging.getLogger(__name__)
LOGGER.setLevel(logging.DEBUG)

# Create a handler for logging to console
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.DEBUG)

# Create a formatter
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
console_handler.setFormatter(formatter)

# Add the handler to the logger
LOGGER.addHandler(console_handler)


def validate_query(value, name):
    if value is None or value == '':
        raise ValueError(
            "Query parameter '{}' is required, cannot be empty".format(name))
    return value

# Runs O(1) time complexity using running sum optimization


class MovingAverage:
    def __init__(self, size, format=True):
        self.size = size
        self.queue = deque(maxlen=size)
        self.sum = 0
        self.format = format

    def next(self, val):
        if len(self.queue) == self.size:
            self.sum -= self.queue[0]
        self.queue.append(val)
        self.sum += val
        avg = self.sum / len(self.queue)
        return format_number(avg) if self.format else str(avg)

    def clear(self):
        self.queue.clear()
        self.sum = 0


def format_number(num, size=4):
    if num >= 1000:  # If the number is 1000 or more, we just truncate it
        return str(num)[:size]
    else:
        str_num = "{:.2f}".format(num)  # Will handle padding too
        integer_part, fractional_part = str_num.split('.')
        if len(integer_part) + len(fractional_part) > size:
            fractional_part = fractional_part[:size - len(integer_part)]
        return f"{integer_part}.{fractional_part}"

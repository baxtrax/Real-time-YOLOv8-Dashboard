import logging

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

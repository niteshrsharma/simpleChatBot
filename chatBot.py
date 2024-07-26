import json
import sys

from chatEngine import getResponseFromPython

if __name__ == "__main__":
    input_data = sys.stdin.read()  # Read raw input including all whitespace
    result = getResponseFromPython(input_data)
    print(result)
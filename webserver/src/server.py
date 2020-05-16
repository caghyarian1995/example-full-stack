from flask import Flask, json, request
import re
import string
import time

api = Flask(__name__)

# This is a regex for identifying the characters that we
# do not allow in an encoded message.
char_blacklist = r'[^A-Za-z\s]+'

# If anything goes wrong, return a 500
def handle_error():
  return {'Status': 500}

# Encode a message by shifting the alpha characters in the string
# the specified number of places in the alphabet. Whitespaces are
# not shifted.
# Inputs:
#   - message: A String containing the message to encode
#   - shift: An Integer contaiing the number of places to shift each character
#            in the alphabet
#
# Outputs:
#   - A String containing the encoded message.
def encode_message(message, shift):

  # Encode all messages in lower case
  lowercase_message = str.lower(message)

  # Ensure shift values are in an acceptable range
  shift = shift % 26

  # Store the entire lowercase alphabet
  alphabet = string.ascii_lowercase

  # Created a shifted version of the alphabet
  encoded_alphabet = alphabet[shift:] + alphabet[:shift]

  # Create a transformation table for the cipher
  transformation_table = str.maketrans(alphabet, encoded_alphabet)

  return lowercase_message.translate(transformation_table)

# Writes the specified data in a timestamped file in the 'data' directory of the server.
# Inputs:
#   - data: A String containing the content to write to the file
#
# Outputs:
#   - None.
def write_to_disk(data):
  timestamp = int(time.time()) # Cast to an int to round
  f = open('./data/'+str(timestamp), "a")
  f.write(str(data))
  f.close()

@api.route('/api/encode', methods=['POST'])
def handle_encode():

  # Get the body of the request
  data = request.get_json()
  message = None
  shift = None

  # Try to get the expected information out of the body of the request.
  try:
    message = str(data['Message'])
    shift = int(data['Shift'])
  except Exception:
    # If fields are missing in the request, return a 500.
    return handle_error()

  # Only allow messages containing characters in the allowed char set
  # by checking for disallowed characters
  if re.search(char_blacklist, message):
    return handle_error()

  # Now that we have guaranteed the message contains the allowed characters,
  # we can encode it.
  encoded_message = encode_message(message, shift)

  result = {'Status': 200, 'Body': {'EncodedMessage': encoded_message } }

  write_to_disk(result['Body']['EncodedMessage'])
  return result

if __name__ == '__main__':
    api.run(port=23456)
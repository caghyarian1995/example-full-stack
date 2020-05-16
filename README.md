# webserver

This is a simple REST API server with a single endpoint for the purpose of showcasing how to implement a barebones
server in Flask.

# Installation

To use this project, you should first install the requirements in the requirements.txt file using pip.

To run, use the ./run_server.bash script. The run script assumes you have 'python3' in your path. If you do not,
you can alternatively run the server by executing the server.py with your python executable. 

To test, use the ./test_server.bash script. This test script assumes you have 'curl' in your path. If you do not,
you can test the server by using an API tool of your choice.

# Anatomy
The project is organized with basic test tools, requirements, and the README all residing at the top level of the directory.

The source code is contained in the src/ directory.

Each successful request to the API will store the result of the request in the data/ directory.

# Configuration

The server requires no configuration. It is hard coded to run on localhost:23456.

# API Documentation

POST /api/encode
Takes a JSON object of the following form as input:
{
    Message: A String to be encoded
    Shift: An# webserver

This is a simple REST API server with a single endpoint for the purpose of showcasing how to implement a barebones
server in Flask.

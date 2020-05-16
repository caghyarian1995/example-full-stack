# Overview

This project contains two subdirectories, each serving a different purpose.

The webserver project is an example implementation of a Flask API server  
The login-page project is an example of a React login page created using material-ui  

This README contains information about both, and instructions on how to run them.

## webserver
This is a simple REST API server with a single endpoint for the purpose of showcasing how to implement a barebones
server in Flask.

### Installation
To use this project, you should first install the requirements in the requirements.txt file using pip.

To run, use the ./run_server.bash script. The run script assumes you have 'python3' in your path. If you do not,
you can alternatively run the server by executing the server.py with your python executable. 

To test, use the ./test_server.bash script. This test script assumes you have 'curl' in your path. If you do not,
you can test the server by using an API tool of your choice.

### Anatomy
The project is organized with basic test tools and requirements residing at the top level of the webserver/ directory.

The source code is contained in the src/ directory.

Each successful request to the API will store the result of the request in the data/ directory.

### Configuration
The server requires no configuration. It is hard coded to run on localhost:23456.

### API Documentation
POST /api/encode  
Takes a JSON object of the following form as input:
{
    Message: A String to be encoded
    Shift: An Integer containing the number of alphabet spaces to shift the message.
}

## login-page

### Installation
To use this project, you need to have npm >= 6.13.4.

In the login-page directory, run 'npm install' to install the necessary packages to run the application.
Once installed, run 'npm start' to start the local web server. This will then allow you to access the application on localhost:3000. It should open your default browser and direct you there automatically.

### Anatomy
The project is contained in the login-page/ directory.

The source code is contained in the src/ directory

The node_modules/ directory will be created when you run 'npm install'

src/App.js is where the main application code is. src/App.css is where the main application styling is.

### Configuration
This project requires no configuration. It defaults to running on localhost:3000
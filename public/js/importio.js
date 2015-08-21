// First we need to import the client library
var importio = require("import-io").client;

var http = require('http');
var net = require('net');
var url = require('url');

// To use an API key for authentication, use the following code:
var io = new importio("8d3b4e0b-1346-4645-8999-ffe3a16213a1", "8d3b4e0b134646458999ffe3a16213a19ebbb5173b84cdee0710512b9b18af1f7ae8fc097de749e9d0b06c76dea6e85ae58ec236b631f96e2de639b62bfb633e0c703a39be4b011cd67ee56f30923fa7", "import.io");

// Once we have started the client and authenticated, we need to connect it to the server:
io.connect(function(connected) {
  // Make sure that your code to use the library only runs after this callback has returned,
  // as prior to this the library is still connecting and may not yet be ready to issue queries

  // Once the callback is called, we need to check whether the connection request was successful
  if (!connected) {
    console.error("Unable to connect");
    return;
  }

  // Define here a variable that we can put all our results in to when they come back from
  // the server, so we can use the data later on in the script
  var data = [];

  // Record the number of currently running queries to the server
  var runningQueries = 0;

  // In order to receive the data from the queries we issue, we need to define a callback method
  // This method will receive each message that comes back from the queries, and we can take that
  // data and store it for use in our app
  var callback = function(finished, message) {
    // Disconnect messages happen if we disconnect the client library while a query is in progress
    if (message.type == "DISCONNECT") {
      console.error("The query was cancelled as the client was disconnected");
    }
    // Check the message we receive actually has some data in it
    if (message.type == "MESSAGE") {
      if (message.data.hasOwnProperty("errorType")) {
        // In this case, we received a message, but it was an error from the external service
        console.error("Got an error!", message.data);
      } else {
        // We got a message and it was not an error, so we can process the data
        console.log("Got data!", message.data);
        data = data.concat(message.data.results);
      }
    }
    if (finished) {
      // When the query is finished, show all the data that we received
      console.log("Done single query");
      runningQueries--;
      // If all queries are done, then log out the data we have
      if (runningQueries <= 0) {
        runningQueries = 0;
        console.log(data);
        console.log("All queries completed");
      }
    }
  }

  // Issue three queries to the same data source with different inputs
  // You can modify the inputs and connectorGuids so as to query your own sources
  // To find out more, visit the integrate page at http://import.io/data/integrate/#minijs

  // Also increment the number of queries we are running
  runningQueries += 2;

  // Query for tile chattanooganow Page Example
  io.query({
    "connectorGuids": [
      "814c472d-fb54-4dad-be6e-cf47295e15d8"
    ],
    "input": {
      "searchterm": ""
    }
  }, callback);
  // Query for tile nooga.com Page Example
  io.query({
    "connectorGuids": [
      "48c91a35-d16f-4bfe-b6a2-53f9579c310a"
    ],
    "input": {
      "searchterm": ""
    }
  }, callback);
  // Query for tile pulse Page Example
  io.query({
    "connectorGuids": [
      "ec7968c6-50cb-4e50-a4c4-a784e19d7929"
    ],
    "input": {
      "searchterm": "Live Music"
    }
  }, callback);


});

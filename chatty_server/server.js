// server.js

const express = require("express");
const Socket = require("ws");
const SocketServer = Socket.Server;
const uuidv4 = require("uuid/v4");
const querystring = require('querystring');
const fetch = require('node-fetch');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static("public"))
  .listen(PORT, "0.0.0.0", "localhost", () =>
    console.log(`Listening on ${PORT}`)
  );

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
let usersOnline = 0;
wss.on("connection", ws => {
  console.log("Client connected");
  usersOnline++;
  data = {
    type: "incomingStatus",
    usersOnline: `${usersOnline} user(s) online`
  };
  wss.broadcast(data);

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on("close", () => {
    usersOnline--;
    console.log(usersOnline);
    console.log("Client disconnected");
    data = {
      type: "incomingStatus",
      usersOnline: `${usersOnline} user(s) online`
    };
    wss.broadcast(data);
  });

  ws.on("message", message => {
    let data = JSON.parse(message);
    switch (data.type) {
      case "postMessage":
        data.type = "incomingMessage";
        data.id = uuidv4();
        wss.broadcast(data);
        break;
      case "postNotification":
        let notification = {
          type: "incomingNotification",
          content: `User ${data.currentUser} changed his nickname to ${data.newUser}`
        };
        wss.broadcast(notification);
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + data.type);
    }
  });
});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(data));
  });
};

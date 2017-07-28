import React, { Component } from "react";
import Navbar from "./Navbar.jsx";
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";
//const querystring = require('querystring');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Bob" },
      messages: [],
      usersOnline: "",
      color: ""
    };
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    function getRandomColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {
        id: 3,
        username: "Michelle",
        content: "Hello there!",
        type: "incomingMessage"
      };
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages });
    }, 3000);
    this.socket = new WebSocket("ws:localhost:3001");

    this.socket.onopen = ev => {
      console.log("Connected to server");
    };
    this.socket.onmessage = event => {
      const data = JSON.parse(event.data);
      let color;
      switch (data.type) {
        case "incomingMessage":
          const mes = {
            id: data.id,
            username: data.username,
            content: data.content,
            type: "incomingMessage",
            color: this.state.color
          };
          if (data.content.match(`^https?://(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:/[^/#?]+)+\.(?:jpg|gif|png)$`)) {
            mes.image = true;
            mes.type ="incomingImage";
          }
          const messages = this.state.messages.concat(mes);
          this.setState({ messages: messages });
          break;
        case "incomingNotification":
          color = getRandomColor();
          const mess = this.state.messages.concat(data);
          this.setState({ messages: mess });
          this.setState({ color: color });
          break;
        case "incomingStatus":
          this.setState({ usersOnline: data.usersOnline });
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + data.type);
      }
    };
  }
  render() {
    let user = "Bob";
    return (
      <div id="chatty">
        <Navbar users={this.state.usersOnline} />
        <MessageList messages={this.state.messages} />
        <ChatBar /*currentUsername={this.state.currentUser.name} */
          updateUser={value => {
            const userUpdate = {
              type: "postNotification",
              currentUser: this.state.currentUser.name,
              newUser: value
            };
            const newUser = {
              name: value
            };
            this.setState({ currentUser: newUser });
            let obj = JSON.stringify(userUpdate);
            this.socket.send(obj);
          }}
          updateMessages={value => {
            const message = {
              type: "postMessage",
              id: Date.now,
              username: this.state.currentUser.name,
              content: value
            };
            let obj = JSON.stringify(message);
            this.socket.send(obj);
            //const messages = this.state.messages.concat(message);
            //this.setState({ messages: messages });
          }}
        />
      </div>
    );
  }
}
export default App;

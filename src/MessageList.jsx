import React, { Component } from "react";
import Message from "./message.jsx";
import MessageSystem from "./messageSystem.jsx";
import MessageImage from "./messageImage.jsx";

class MessageList extends Component {
  render() {
    const messages = this.props.messages;
    let id = 1;
    return (
      <main className="messages">
        <div className="message">
          <ul>
            {messages.map(message => {
              if (message.type === "incomingMessage") {
                return <Message message={message} key={id++} />;
              } else if(message.type === "incomingImage") {
                return <MessageImage message={message}/>
              } else {
                return <MessageSystem notification={message} />
              }
            })}
          </ul>
        </div>
      </main>
    );
  }
}

export default MessageList;

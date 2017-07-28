import React, { Component } from "react";

class Message extends Component {
  render() {
    const message = this.props.message;

    return (
      <li key={message.id}>
        <span className="message-username" key={message.id} style={{color: message.color}}>
          {message.username}
        </span>
        {message.content}
      </li>
    );
  }
}
export default Message;

import React, { Component } from "react";

class MessageImage extends Component {
  render() {
    const message = this.props.message;

    return (
      <li key={message.id}>
        <span className="message-username" key={message.id} style={{color: message.color}}>
          {message.username}
        </span>
            <div>
                <img src={message.content} width="60%" height="60%"/>
            </div>
      </li>
    );
  }
}
export default MessageImage;

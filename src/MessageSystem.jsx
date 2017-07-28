import React, { Component } from "react";

class MessageSystem extends Component {
  render() {
    const notification = this.props.notification;

    return (
      <div className="message system">
        {notification.content}
      </div>
    );
  }
}
export default MessageSystem;

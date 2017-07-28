import React, { Component } from "react";

class ChatBar extends Component {
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" value={this.props.currentUsername} 
        onBlur= { event => {
          this.props.updateUser(event.target.value);
        }}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" 
        onKeyPress= { event => {
          if(event.key === 'Enter') {
            this.props.updateMessages(event.target.value);
          }
        }}/>
      </footer>
    );
  }
}

export default ChatBar;
 
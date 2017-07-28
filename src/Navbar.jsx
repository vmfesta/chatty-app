import React, { Component } from "react";

class Navbar extends Component {
  render() {
    let users = this.props.users
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">
          Chatty
        </a>
        <span className="navbar-online"> {users} </span>
      </nav>
    );
  }
}

export default Navbar;

import React, { Component } from 'react';
import { connect } from "react-redux";
import { authenticateUser } from "../../actions/authedUser";
import { Redirect } from "react-router-dom";

import "./SignIn.css";

class Login extends Component {
  state = {
    isAuthentificated: false
  }

  handleClick = (event) => {
    const name = event.target.textContent;

    this.props.dispatch(authenticateUser(name)); 
    this.setState(() => {
      return {
        isAuthentificated: true
      }
    });  

    document.cookie = "authed=true"; 
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/homepage" } }

    if (this.state.isAuthentificated) {
      return <Redirect to={ from } />
    }
    
    const listItems = Object.values(this.props.users).map((user) => {
      return <li onClick={ this.handleClick } key={user.id} id={user.id}>{ user.name }</li>
    });

    return (
      <div>
        <h1>Would you rather ... ?</h1>
        <p>Please click on your user-name to sign in!</p>
        <ul className="users-list">
          {listItems}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    username: state.username || ""
  };
}

export default connect(mapStateToProps)(Login);
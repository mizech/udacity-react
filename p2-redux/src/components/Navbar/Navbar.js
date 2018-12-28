import React, { Component } from 'react';
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import { signOut } from "./../../actions/authedUser";
import "./Navbar.css";

class Navbar extends Component {
  render() {
    return (
      <div>
        <span className="nav-item">
            <NavLink className="nav-link" activeClassName="active-link" to="/homepage">Home</NavLink>
        </span>
        <span className="nav-item">
            <NavLink className="nav-link" activeClassName="active-link" to="/leaderboard">Leaderboard</NavLink>
        </span>
        <span className="nav-item">
            <NavLink className="nav-link" activeClassName="active-link" to="/add">Add question</NavLink>
        </span>
        <span className="nav-item"><b>Logged in as:</b> { this.props.username }</span>
        <span className="nav-item">
            <button onClick={() => {
                this.props.handleClickLogOut(this.props.username);
                document.cookie = "authed=false";
                window.location.href = window.location.origin;
            }}>Log Out</button>
        </span>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        username: state.authedUser.username
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleClickLogOut: (id) => {
            dispatch(signOut(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
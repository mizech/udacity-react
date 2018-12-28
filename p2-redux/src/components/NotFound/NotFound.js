import React, { Component } from 'react';

import { Redirect, Link } from "react-router-dom";
import "./NotFound.css";

class NotFound extends Component {
 
  render() {
   
    return (
      <div>
        <h1>Would you rather ... ?</h1>
        <Link className="nav-link-not-found" to="/">Go Back</Link>
        <p className="error">404-Error has occurred!</p>
        <p>The requested page could not be found.</p>
      </div>
    )
  }
}

export default NotFound;
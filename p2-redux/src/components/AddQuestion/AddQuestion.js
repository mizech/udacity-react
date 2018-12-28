import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Navbar from "./../Navbar/Navbar";
import { handleAddQuestion } from "./../../actions/questions";
import "./AddQuestion.css";

class AddQuestion extends Component {
  state = {
      optionOne: "",
      optionTwo: "",
      errorOccurred: false,
      insertionOccurred: false
  }

  render() {
    let authed = false; 
    
    if (document.cookie) {
      const parts = document.cookie.split("=");

      if (parts.length) {
        authed = parts[1];
      }
    }
   
    if (!this.props.username && !authed) {
        return <Redirect to="/" />
    }

    const handleOptionChanged = (event, option) => {
        this.setState({
            [option]: event.target.value
        });
    }

    const handleClickInsert = () => {
        if (this.state.optionOne.length === 0 || this.state.optionTwo.length === 0) {
            this.setState({
                errorOccurred: true
            });

            return;
        }

        this.props.insert(this.state.optionOne, this.state.optionTwo);

        this.setState({
            optionOne: "",
            optionTwo: "",
            errorOccurred: false,
            insertionOccurred: true
        });
    }

    let errorMessage = null;

    if (this.state.errorOccurred) {
        errorMessage = <div id="error">Please enter an option in both input controls!</div>;
    }

    let redirect = null;

    if (this.state.insertionOccurred) {
        redirect = <Redirect to="/homepage" />
    }

    return (
      <div>
        { redirect }
        <Navbar />
        <h1>Would you rather ... ?</h1>
        <div className="label-input">
            <label htmlFor="optionOne">Option One: </label>
            <input type="text" id="optionOne" 
                    placeholder="Enter here the first option ..." 
                    onChange={(event) => {
                        handleOptionChanged(event, "optionOne");
                    }} />
        </div>
        <div className="label-input">
            <label htmlFor="optionTwo">Option Two: </label>
            <input type="text" id="optionTwo" 
                    placeholder="Enter here the second option ..." 
                    onChange={(event) => {
                        handleOptionChanged(event, "optionTwo");
                    }} />
        </div>
        <button onClick={handleClickInsert}>Create Poll</button>
        <div className="message-box">{ errorMessage }</div>
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
        insert: (optionOne, optionTwo) => {
            dispatch(handleAddQuestion(optionOne, optionTwo));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion);
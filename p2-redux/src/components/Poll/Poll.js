import React, { Component } from 'react';
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";

import Navbar from "./../Navbar/Navbar";
import { handleAnswerQuestion } from "./../../actions/questions";
import './Poll.css';

class Poll extends Component {

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

        let qid;

        qid = window.location.pathname.split("/")[2];
        const currentQuestion = this.props.questions[qid];

        let avatarUrl;

        if (this.props.users[currentQuestion.author]) {
            avatarUrl = this.props.users[currentQuestion.author].avatarURL;
        }

        const url = "/questions/result/" + qid;
       
        return <div className="result" >
                    <Navbar />
                    <h1>Would you rather ... ?</h1> 
                    <div className="creator">
                        <img width="60" src={avatarUrl} alt="avatar" />
                        <span><b>Ask by:</b> {currentQuestion.author}</span>
                    </div>
                    <div>
                        <div className="option optionOne">
                            <Link onClick={(event) => {
                                this.props.handleSelect(qid, event.target.dataset.option);
                            }} className="option-link" data-option="optionOne"
                            to={ url }>Option 1: { currentQuestion.optionOne.text }</Link>
                        </div>
                        <div onClick={(event) => {
                                this.props.handleSelect(qid, event.target.dataset.option);
                            }} className="option optionTwo">
                            <Link className="option-link" data-option="optionTwo"
                                to={ url }>Option 2: { currentQuestion.optionTwo.text }</Link>
                        </div>
                        <p className="hint">Please select one option by clicking on it!</p>
                    </div>   
                </div>
    }
};

const mapStateToProps = (state) => {
    return {
        questions: state.questions,
        users: state.users,
        username: state.authedUser.username || ""
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleSelect: (questionId, answer) => {
            dispatch(handleAnswerQuestion(questionId, answer));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Poll);
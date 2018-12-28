import React, { Component } from 'react';

import { connect } from "react-redux";
import './Result.css';

class Result extends Component {
    render() {
        let qid;

        if (this.props.questionId) {
            qid = this.props.questionId;
        } else {
            qid = window.location.pathname.split("/")[2];
        }

        let question = Object.values(this.props.questions).find((question) => {
            return question.id === qid;
        });

        const sum = parseInt(question.optionOne.votes.length)
            + parseInt(question.optionTwo.votes.length);
        
        const computePercentage = (option) => {
            return (option * 100) / (sum || 1);
        }

        const currentQuestion = this.props.questions[qid];

        const optionOne = currentQuestion
                                .optionOne
                                .votes
                                .some((vote) => {
                                    return vote === this.props.username
                                                                .toLowerCase()
                                                                .replace(" ", "");
                                });

        let classValueOptionOne = "";
        let classValueOptionTwo = "";

        if (optionOne === true) {
            classValueOptionOne = "question selected";
            classValueOptionTwo = "question";
        } else {
            classValueOptionOne = "question";
            classValueOptionTwo = "question selected";
        }

        return <div className="result" >
            <h2>Current Poll Result</h2>
            <div className="optionResult">
                <div className={ classValueOptionOne }>{ question.optionOne.text }</div>
                <div>
                    <b>Votes:</b> { question.optionOne.votes.length } - <b>Percentage: </b> 
                        {computePercentage(question.optionOne.votes.length)}%
                </div>
            </div>
            <div className="optionResult">
                <div className={ classValueOptionTwo }>{ question.optionTwo.text }</div>
                <div>
                    <b>Votes:</b> { question.optionTwo.votes.length } - <b>Percentage: </b> 
                        {computePercentage(question.optionTwo.votes.length)}%
                </div>
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

export default connect(mapStateToProps)(Result);
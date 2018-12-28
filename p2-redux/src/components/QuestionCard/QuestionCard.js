import React, { Component } from 'react';

import Result from "../Result/Result";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { handleAnswerQuestion } from "./../../actions/questions";
import './QuestionCard.css';

class QuestionCard extends Component {
    render() {
        let bottomPart = null;
        const qid = this.props.id;

        if (!this.props.answered) {
            const url = "/questions/" + this.props.id;

            bottomPart = (
                <div>
                    <div className="question">
                        <h2>Would you rather ... ?</h2>
                        {this.props.optionOne} <b>or</b> {this.props.optionTwo}
                    </div>
                    <div className="visit-poll">
                        <Link className="link" to={ url } >Visit Poll</Link>
                    </div>
                </div>
            );
        } else {
            bottomPart = <Result questionId={ qid } />
        }

        return <div className="question-card" >
            <div className="headPart">
                <h3>Author : { this.props.author }</h3>
                <div>
                    <img width="40" src={ this.props.avatarUrl } alt="avatar" />
                </div>
            </div>
            {bottomPart}
        </div>
    }
};


const mapStateToProps = (state) => {
    return {
        users: state.users,
        questions: state.questions,
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

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCard);
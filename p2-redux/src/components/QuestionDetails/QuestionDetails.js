import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Navbar from "./../Navbar/Navbar";
import QuestionCard from "./../QuestionCard/QuestionCard";
import "./QuestionDetails.css";

class QuestionDetails extends Component {
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

    const searchedQuestionId = this.props.match.params.question_id;

    const question = Object.values(this.props.questions)
                            .find((question) => {
                        return question.id === searchedQuestionId;
                    });

    if (!question) {
      return <Redirect to="/" />
    }
   
    return (
      <div>
        <Navbar />
        <h1>Would you rather ... ?</h1>
       
        <QuestionCard author={ question.author } key="1"
                        authedUser={ this.props.username }
                        answered="true"
                        id={ question.id }
                        avatarUrl={this.props.users[question.author].avatarURL}
                    />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        questions: state.questions,
        username: state.authedUser.username || ""
    };
}

export default connect(mapStateToProps)(QuestionDetails);
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import QuestionCard from "./../QuestionCard/QuestionCard";
import Navbar from "./../Navbar/Navbar";
import "./Homepage.css";

class Homepage extends Component {
  state = {
    answered: false
  }

  handleClick = () => {   
    this.setState(() => {
      return {
        answered: !this.state.answered
      }
    });   
  }

  createQuestionCards(arrayQuestions) {
    return arrayQuestions.map((question, index) => {
      const username = question.author;
      let avatarUrl;
   
      if (this.props.users[username]) {
        avatarUrl = this.props.users[username].avatarURL;
      }
      
      return <QuestionCard author={ question.author } key={ index }
                            authedUser={ this.props.username }
                            optionOne={ question.optionOne.text }
                            optionTwo={ question.optionTwo.text }
                            answered={ this.state.answered } 
                            countOptionOne={ question.optionOne.votes.length }
                            countOptionTwo={ question.optionTwo.votes.length }
                            id={ question.id }
                            avatarUrl={ avatarUrl }
                            />
    });
  }

  sortQuestionsDescendingByTimestamp(a, b) {
    if (a.timestamp > b.timestamp) {
      return -1;
    } else if (a.timestamp < b.timestamp) {
      return 1;
    } else {
      return 0;
    }
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

    let questionCards = [];

    if (this.state.answered) {
        const questionsAnswered = Object.values(this.props.questions).filter((question) => {
          return question.optionOne.votes.length > 0 || question.optionTwo.votes.length > 0;
        }).sort(this.sortQuestionsDescendingByTimestamp);

        questionCards = this.createQuestionCards(questionsAnswered);
    } else {
        const questionsUnanswered = Object.values(this.props.questions).filter((question) => {
          return question.optionOne.votes.length === 0 && question.optionTwo.votes.length === 0;
        }).sort(this.sortQuestionsDescendingByTimestamp);

        questionCards = this.createQuestionCards(questionsUnanswered);
    }

    return (
      <div>
        <Navbar username={ this.props.username } />
        <h1>Would you rather ... ?</h1>
        <a href="#" id="toggle" onClick={this.handleClick}
                    className="ghost-button">Toggle Un-/Answered Questions</a>
        {questionCards}
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

export default connect(mapStateToProps)(Homepage);
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Navbar from "./../Navbar/Navbar";
import "./Leaderboard.css";

class User {
  constructor(name) {
    this.createdQuestions = 0;
    this.answeredQuestions = 0;
  }
}

class Leaderboard extends Component {
  render() {
    const sortUsersByAnswersAndQuestions = (a, b) => {
      const sumA = Object.values(a.answers).length + a.questions.length;
      const sumB = Object.values(b.answers).length + b.questions.length;

      if (sumA > sumB) {
        return -1;
      } else if (sumA < sumB) {
        return 1;
      } else {
        return 0;
      }
    }

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

    const users = Object.values(this.props.users);
    const status = [];
    const questions = Object.values(this.props.questions);

    users.sort(sortUsersByAnswersAndQuestions);

    users.forEach(user => {
      status[user.name.toLowerCase().replace(" ", "")] = new User();
    });

    questions.forEach((question) => {
      if (status[question.author]) {
        status[question.author].createdQuestions++;
      }

      question.optionOne.votes.forEach((voted) => {
        if (status[voted]) {
          status[voted].answeredQuestions++;
        }
      });

      question.optionTwo.votes.forEach((voted) => {
        if (status[voted]) {
          status[voted].answeredQuestions++;
        }
      });
    });

    const userProfil = users.map((user, index) => {
      return <div key={index} className="user-profil">
        <div className="user-avatar">
          <img src={ user.avatarURL } alt="avatar" />
        </div>
        <div className="user-status">
          <h3>{ user.name }</h3>
          <p><span>Created questions: </span>{status[user.id].createdQuestions}</p>
          <p><span>Answered questions: </span>{status[user.id].answeredQuestions}</p>
        </div>
      </div>
    });

    return (
      <div>
        <Navbar />
        <h1>Leaderboard</h1>
        <div>
          { userProfil }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        questions: state.questions,
        users: state.users,
        username: state.authedUser.username || ""
    };
}

export default connect(mapStateToProps)(Leaderboard);
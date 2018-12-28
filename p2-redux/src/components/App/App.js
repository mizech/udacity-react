import React, { Component } from 'react'
import {  Route,
          BrowserRouter as Router,
          Switch,
          Redirect } from "react-router-dom";
import { connect } from "react-redux";

import SignIn from "../SignIn/SignIn";
import Homepage from "../Homepage/Homepage";
import Leaderboard from "../Leaderboard/Leaderboard";
import AddQuestion from "../AddQuestion/AddQuestion";
import QuestionDetails from "../QuestionDetails/QuestionDetails";
import Poll from "../Poll/Poll";
import NotFound from "../NotFound/NotFound";
import "./App.css";
import { handleInitialData } from '../../actions/shared';
import PrivateRoute from "./PrivateRoute";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());   
  }

  render() {
    let intercept = null;

    setTimeout(() => {
      let qid;
    
      if (window.location.pathname && window.location.pathname.indexOf("result") === -1) {
        qid = window.location.pathname.split("/")[2];
      } else if (window.location.pathname && window.location.pathname.indexOf("result") > -1) {
        qid = window.location.pathname.split("/")[3];
      }
      
      if (qid) {
        let find = Object.values(this.props.questions).some((question) => {
          return question.id === qid;
        });

        if (!find) {
          intercept = <Redirect to={{
            pathname: "/",
            state: {
              from: {
                pathname: "/invalid"
              }
            }
          }} />
        }
      }
    }, 100);
  
    return (
      <div className="wrap">
        <Router>
          <Switch>
            <Route path="/" exact component={ SignIn } />
            <PrivateRoute path="/homepage" component={ Homepage } />
            <PrivateRoute path="/leaderboard" component={ Leaderboard } />
            { intercept }
            <PrivateRoute path="/questions/result/:question_id" component={ QuestionDetails } />
            <PrivateRoute path="/questions/:question_id" component={ Poll } />
            <PrivateRoute path="/add" component={ AddQuestion } />
            <PrivateRoute path="/invalid" component={ NotFound } />
            <PrivateRoute component={ NotFound } />
          </Switch>
        </Router>
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

export default connect(mapStateToProps)(App);
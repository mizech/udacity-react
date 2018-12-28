import {
  _getUsers,
  _saveQuestion,
  _getQuestions,
  _saveQuestionAnswer,
  _saveNewUser
} from './_DATA.js'

export function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions
  }))
}

export function saveQuestion (question) {
  return _saveQuestion(question)
}

export function saveQuestionAnswer (authedUser, qid, answer) {
  if (authedUser) {
    authedUser = authedUser.toLowerCase().replace(" ", "");
  } else {
    authedUser = "";
  }

  return _saveQuestionAnswer({
    qid,
    authedUser,
    answer
  });
}
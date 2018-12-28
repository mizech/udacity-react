import { ADD_QUESTION, RECEIVE_QUESTIONS } from "./types";
import { saveQuestion, saveQuestionAnswer } from "../utils/api"
import {handleInitialData} from "./shared";

export const addQuestion = (questions) => {
    return {
        type: ADD_QUESTION,
        questions
    }
}

export const receiveQuestions = (questions) => {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const currentState = getState();
        const authedUser = currentState
                            .authedUser.username
                            .toLowerCase().replace(" ", "");
     
        return saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser
        })
            .then(() => {
                dispatch(handleInitialData())
            })
    }
}

export function handleAnswerQuestion(qid, answer) {
    return (dispatch, getState) => {
        const authUser = (getState()).authedUser.username;

        return saveQuestionAnswer(authUser, qid, answer)
                .then(() => {
                    dispatch(handleInitialData());
                });
    }
}


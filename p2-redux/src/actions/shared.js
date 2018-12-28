import { receiveQuestions } from "../actions/questions";
import { receiveUsers } from "../actions/users";
import { getInitialData } from "../utils/api";

export const handleInitialData = () => {
    return (dispatch) => {
        return getInitialData()
            .then(({
                users,
                questions
            }) => {
                dispatch(receiveQuestions(questions));
                dispatch(receiveUsers(users));
            })
    }
}


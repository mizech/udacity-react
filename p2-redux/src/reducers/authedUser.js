import { AUTHENTICATE_USER, SIGN_OUT } from "../actions/types";

export default function authedUser (state = {}, action) {
    switch (action.type) {
        case AUTHENTICATE_USER:
            return {
                ...state,
                username: action.username
            };
        case SIGN_OUT:
            return {}
        default: 
            return state;
    }
}
import { AUTHENTICATE_USER, SIGN_OUT } from "./types";

export const signOut = (id) => {
    return {
        type: SIGN_OUT,
        id
    };
}

export const authenticateUser = (username) => {
    return {
        type: AUTHENTICATE_USER,
        username
    };
}


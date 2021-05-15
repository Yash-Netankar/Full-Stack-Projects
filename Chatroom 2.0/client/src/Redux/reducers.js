import { LOGGED } from "./actionType";

// logged in state
const loggedState = false;

// logged in reducer
export const LoggedReducer = (state = loggedState, { type, payload }) => {
    switch (type) {

        case LOGGED:
            if (payload === true) {
                state = true
                return state
            }
            return state

        default:
            return false
    }
}



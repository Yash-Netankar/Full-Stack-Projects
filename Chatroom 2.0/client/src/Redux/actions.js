import { LOGGED } from "./actionType";

// logged in
export const loggedIn = (logged) => ({
    type: LOGGED,
    payload: logged
})

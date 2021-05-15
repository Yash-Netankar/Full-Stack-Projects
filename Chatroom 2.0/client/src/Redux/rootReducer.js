import { LoggedReducer } from "./reducers";
import { createStore, combineReducers } from "redux";

const root = combineReducers({
    Login: LoggedReducer
})
const store = createStore(root)
export default store
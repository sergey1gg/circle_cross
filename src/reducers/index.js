import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import thunkMiddleware from "redux-thunk"
import gameReducer from "./gameReducer";

let reducers = combineReducers({
//    profilePage: profileReducer,
//    dialogsPage: dialogsReducer,
//    sidebar: sidebarReducer,
//    usersPage: usersReducer,
    game: gameReducer
})
let store = createStore(reducers,applyMiddleware(thunkMiddleware))
window.store=store

export default store
import rootReducer from './Reducer/rootreducer'
import { createStore, applyMiddleware, } from 'redux';
import { combineEpics,createEpicMiddleware } from "redux-observable";
import RootEpic from "./epic";
const epics = combineEpics(
    RootEpic.deleteTodo,
    RootEpic.updateTodo
);
const rootEpic=createEpicMiddleware(epics)
export const store = createStore(rootReducer, applyMiddleware(rootEpic));
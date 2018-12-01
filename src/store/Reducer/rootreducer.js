import { Appaction } from "../actions/appactions";

const initialState = {
    data: ["Ali", "Kamran", "Shahid"],
}
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case Appaction.DELETE_TODO:
            return state;
        case Appaction.DELETE_TODO_SUCCESS:
            return Object.assign({}, state, { success: true })
        case Appaction.DELETE_TODO_FAIL:
            return Object.assign({}, state, { success: false })
        case Appaction.UPDATE_TODO:
            return state;
        case Appaction.UPDATE_TODO_SUCCESS:
            return Object.assign({}, state, { success: true })
        case Appaction.UPDATE_TODO_FAIL:
            return Object.assign({}, state, { success: false })
        case Appaction.ADD_TODO:
            return state;
        case Appaction.ADD_TODO_SUCCESS:
            return Object.assign({}, state, { success: true })
        case Appaction.ADD_TODO_FAIL:
            return Object.assign({}, state, { success: false })
        default:
            return state
    }
}
export default rootReducer;
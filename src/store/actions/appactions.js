export class Appaction{

    static ADD_TODO="ADD_TODO";
    static ADD_TODO_SUCCESS="ADD_TODO_SUCCESS";
    static ADD_TODO_FAIL="ADD_TODO_FAIL";

    static DELETE_TODO="DELETE_TODO";
    static DELETE_TODO_SUCCESS="DELETE_TODO_SUCCESS";
    static DELETE_TODO_FAIL="DELETE_TODO_FAIL";

    static UPDATE_TODO="UPDATE_TODO";
    static UPDATE_TODO_SUCCESS="UPDATE_TODO_SUCCESS";
    static UPDATE_TODO_FAIL="UPDATE_TODO_FAIL";

    static deleteTodo(payload){
        return {
            type:Appaction.DELETE_TODO,
            payload
        }
    }
    static updateTodo(payload){
        return {
            type:Appaction.UPDATE_TODO,
            payload
        }
    }
    static addTodo(payload){
        return {
            type:Appaction.ADD_TODO,
            payload
        }
    }
}
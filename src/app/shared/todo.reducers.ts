import {TodoItem} from "../todo-list/todo-list.component";
import {GET_TODO_LIST, GET_TODO_LIST_SUCCESS, GetTodoListActions} from "./todo.actions";

export interface State {
    todoListResult: TodoItem[];
}

const initialState: State = {
    todoListResult: []
}

export function reducer(state = initialState, action: GetTodoListActions): State {
    switch (action.type) {
        // case GET_TODO_LIST: {
        //     return {
        //         ...state,
        //         todoListResult: []
        //     }
        // }

        case GET_TODO_LIST_SUCCESS: {
            return {
                ...state,
                todoListResult: action.payload.todoListResult
            }
        }

        default: {
            return state;
        }
    }
}
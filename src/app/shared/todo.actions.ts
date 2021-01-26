import { Action } from '@ngrx/store';
import {TodoItem} from "../todo-list/todo-list.component";

export const GET_TODO_LIST = '[TODO] GET LIST';
export const GET_TODO_LIST_SUCCESS = '[TODO] GET LIST SUCCESS';

export class GetTodoListAction implements Action {
    readonly type = GET_TODO_LIST;
}

export class GetTodoListSuccessAction implements Action {
    readonly type = GET_TODO_LIST_SUCCESS;

    constructor(public payload: {todoListResult: TodoItem[]}) {
    }
}

export type GetTodoListActions = GetTodoListAction | GetTodoListSuccessAction;
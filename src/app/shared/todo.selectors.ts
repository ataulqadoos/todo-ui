import {createFeatureSelector, createSelector} from "@ngrx/store";
import {State} from "./todo.reducers";

export const getState = createFeatureSelector<State>('todoReducer');
export const getTodoListResult = createSelector(getState, state => state.todoListResult);
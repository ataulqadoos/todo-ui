import { Injectable} from "@angular/core";
import {Actions, Effect, ofType} from '@ngrx/effects';
import {GET_TODO_LIST, GetTodoListAction, GetTodoListSuccessAction} from "./todo.actions";
import {TodoService} from "../service/todo.service";
import {map, switchMap} from "rxjs/operators";
import {TodoItem} from "../todo-list/todo-list.component";

@Injectable()
export class TodoEffects {
    @Effect()
    loadTodoList$ =
        this.actions$.pipe(
            ofType(GET_TODO_LIST),
            switchMap(() => this.todoService.getTodoList()),
            map((result: TodoItem[]) => new GetTodoListSuccessAction({ todoListResult: result }))
        );

    constructor(private actions$: Actions,
                private todoService: TodoService) {
    }
}
import {Component, OnDestroy, OnInit} from '@angular/core';
import {TodoService} from "../service/todo.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {GetTodoListAction} from "../shared/todo.actions";
import {getTodoListResult} from "../shared/todo.selectors";

export interface TodoItem {
  id: number;
  name: string,
  details: string;
  done: boolean;
  scheduledDateTime: string;
  completedAt: string;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'name', 'details', 'status', 'scheduledDateTime', 'completedAt', 'done'];

  todoList: TodoItem[] = [];

  todoStoreSubscription: Subscription;

  constructor(private todoService: TodoService,
              private router: Router,
              private store: Store<any>) {
  }

  ngOnInit() {
    if (this.todoList.length === 0) {
      this.store.dispatch(new GetTodoListAction());
      this.todoStoreSubscription = this.store.select(getTodoListResult).subscribe(result => {
        console.log(result);
        this.todoList = result;
      });
    }
  }

  ngOnDestroy(): void {
    if (this.todoStoreSubscription) {
      this.todoStoreSubscription.unsubscribe();
    }
  }

  onCheckboxClick(todoId) {
    const item = this.todoList.filter(item => item.id === todoId)[0]
    item.done = !item.done;
    this.todoService.updateTodoItem(item).subscribe(data => {
      console.log(data);
    })
  }

  onCreate() {
    this.router.navigate(['/create']);
  }
}

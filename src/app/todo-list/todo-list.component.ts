import {Component, OnDestroy, OnInit} from '@angular/core';
import {TodoService} from "../service/todo.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

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

  todoServiceSubscription: Subscription;

  constructor(private todoService: TodoService,
              private router: Router) {
  }

  ngOnInit() {
    this.todoServiceSubscription = this.todoService.getTodoList().subscribe(data => {
      this.todoList = data as TodoItem[];
    });
  }

  ngOnDestroy(): void {
    if (this.todoServiceSubscription) {
      this.todoServiceSubscription.unsubscribe();
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

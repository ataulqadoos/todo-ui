import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TodoItem} from "../todo-list/todo-list.component";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {TodoService} from "../service/todo.service";

@Component({
  selector: 'app-todo-item-edit',
  templateUrl: './todo-item-edit.component.html',
  styleUrls: ['./todo-item-edit.component.scss']
})
export class TodoItemEditComponent implements OnInit, OnDestroy {

  itemDetailForm: FormGroup;

  todoItem: TodoItem;

  todoServiceSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private todoService: TodoService,
              private fb: FormBuilder) {
    this.itemDetailForm = this.fb.group({
      name: ['', Validators.required],
      details: ['', Validators.required],
      done: [false],
      scheduledAt: ['']
    });
  }

  ngOnInit() {
    const todoId = +this.route.snapshot.paramMap.get('id');
    this.todoServiceSubscription = this.todoService.getTodoItem(todoId).subscribe(data => {
      this.todoItem = data as TodoItem;
      if (this.todoItem) {
        this.itemDetailForm.patchValue({name: this.todoItem.name});
        this.itemDetailForm.patchValue({details: this.todoItem.details});
        this.itemDetailForm.patchValue({done: this.todoItem.done});
        this.itemDetailForm.patchValue({scheduledAt: this.todoItem.scheduledDateTime});
      }
    });
  }

  onSubmit() {
    this.todoItem.name = this.itemDetailForm.value.name;
    this.todoItem.details = this.itemDetailForm.value.details;
    this.todoItem.done = this.itemDetailForm.value.done;
    this.todoItem.scheduledDateTime = this.itemDetailForm.value.scheduledAt;
    if (this.itemDetailForm.value.done === true) {
      this.todoItem.completedAt = new Date().toString();
    }

    this.todoService.updateTodoItem(this.todoItem).subscribe(() => {
      this.router.navigate(['/list']);
    });
  }

  ngOnDestroy() {
    this.todoServiceSubscription.unsubscribe();
  }

  onDelete() {
    this.todoService.deleteTodoItem(this.todoItem.id).subscribe(() => {
      this.router.navigate(['/list']);
    })
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TodoItem} from "../todo-list/todo-list.component";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {TodoService} from "../service/todo.service";

@Component({
  selector: 'app-todo-item-create',
  templateUrl: './todo-item-create.component.html',
  styleUrls: ['./todo-item-create.component.scss']
})
export class TodoItemCreateComponent implements OnInit, OnDestroy {

  itemDetailForm: FormGroup;

  todoServiceSubscription: Subscription;

  constructor(private router: Router,
              private todoService: TodoService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.itemDetailForm = this.fb.group({
      name: ['', Validators.required],
      details: ['', Validators.required],
      scheduledAt: ['']
    });
  }

  onSubmit() {
    const newItem = {
      id: null,
      name: this.itemDetailForm.value.name,
      details: this.itemDetailForm.value.details,
      scheduledDateTime: this.itemDetailForm.value.scheduledAt,
      done: false,
      completedAt: null
    };
    this.todoServiceSubscription = this.todoService.createTodoItem(newItem).subscribe(data => {
      this.router.navigate(['/list']);
    })
  }

  ngOnDestroy() {
    this.todoServiceSubscription.unsubscribe();
  }


}

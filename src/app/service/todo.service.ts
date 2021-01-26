import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, of} from "rxjs";
import {TodoItem} from "../todo-list/todo-list.component";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todoApiUrl = environment.todoApiUrl + '/todo';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  constructor(private http: HttpClient) { }

  getTodoList() {
    return this.http.get(environment.todoApiUrl + '/todo');
  }

  getTodoItem(id: number) {
    const url = `${environment.todoApiUrl}/todo/${id}`;
    return this.http.get(url);
  }

  createTodoItem(todoItem: TodoItem) {
    return this.http.post<TodoItem>(this.todoApiUrl, todoItem, this.httpOptions);
  }

  deleteTodoItem(id: number) {
    const url = `${this.todoApiUrl}/${id}`;
    return this.http.delete<TodoItem>(url, this.httpOptions);
  }

  updateTodoItem(todoItem: TodoItem) {
    return this.http.put(this.todoApiUrl, todoItem, this.httpOptions)
      .pipe(tap(_ => console.log(`updated todo id=${todoItem.id}`)));
  }
}

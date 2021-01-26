import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HttpClient, HttpResponse, HttpErrorResponse } from "@angular/common/http";

import { TodoService } from './todo.service';
import {TodoItem} from "../todo-list/todo-list.component";
import {defer} from "rxjs";
import {environment} from "../../environments/environment";

fdescribe('TodoService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let todoService: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ TodoService ]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    todoService = TestBed.get(TodoService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(todoService).toBeTruthy();
  });

  it ('should return todo item list promise', () => {
    const expectedList: TodoItem[] = [
      { id: 1, name: 'todo item 1', details: 'something to do', done: false, completedAt: '', scheduledDateTime: ''}
    ];

    todoService.getTodoList().subscribe(
        todoItemList => expect(todoItemList).toEqual(expectedList, 'expected list')
    );

    const req = httpTestingController.expectOne(`${environment.todoApiUrl}/todo`);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedList);

  });

  it ('should return single todo item by id', () => {
    const expectedItem: TodoItem =
        { id: 1, name: 'todo item 1', details: 'something to do', done: false, completedAt: '', scheduledDateTime: ''};

    todoService.getTodoItem(1).subscribe(
        todoItem => expect(todoItem).toEqual(expectedItem, 'expected item')
    );

    const req = httpTestingController.expectOne(`${environment.todoApiUrl}/todo/1`);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedItem);
  });

  it ('should return success on create new item', () => {
    const expectedItem: TodoItem =
        { id: 0, name: 'todo item 1', details: 'something to do', done: false, completedAt: '', scheduledDateTime: ''};

    todoService.createTodoItem(expectedItem).subscribe();

    const req = httpTestingController.expectOne(`${environment.todoApiUrl}/todo`);
    expect(req.request.method).toEqual('POST');
    const expectedResponse = new HttpResponse({
      status: 201,
      statusText: 'OK'
    });
    req.event(expectedResponse);
  });

  it ('should return success on delete item', () => {
    todoService.deleteTodoItem(1).subscribe();

    const req = httpTestingController.expectOne(`${environment.todoApiUrl}/todo/1`);
    expect(req.request.method).toEqual('DELETE');
    const expectedResponse = new HttpResponse({
      status: 200,
      statusText: 'OK'
    });
    req.event(expectedResponse);
  });

  it ('should return success on update item', () => {
    const expectedItem: TodoItem =
        { id: 0, name: 'todo item 1', details: 'something to do', done: false, completedAt: '', scheduledDateTime: ''};

    todoService.updateTodoItem(expectedItem).subscribe();

    const req = httpTestingController.expectOne(`${environment.todoApiUrl}/todo`);
    expect(req.request.method).toEqual('PUT');
    const expectedResponse = new HttpResponse({
      status: 200,
      statusText: 'OK'
    });
    req.event(expectedResponse);
  });

  function asyncData<T>(data: T) {
    return defer(() => Promise.resolve(data));
  }
});


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TodoListComponent} from "./todo-list/todo-list.component";
import {TodoItemDetailComponent} from "./todo-item-detail/todo-item-detail.component";
import {TodoItemEditComponent} from "./todo-item-edit/todo-item-edit.component";


const routes: Routes = [
  { path: 'list', component: TodoListComponent},
  { path: 'create', component: TodoItemEditComponent},
  { path: 'detail/:id', component: TodoItemDetailComponent},
  { path: '', redirectTo: '/list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

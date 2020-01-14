import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TodoListComponent} from "./todo-list/todo-list.component";
import {TodoItemEditComponent} from "./todo-item-edit/todo-item-edit.component";
import {TodoItemCreateComponent} from "./todo-item-create/todo-item-create.component";


const routes: Routes = [
  { path: 'list', component: TodoListComponent},
  { path: 'create', component: TodoItemCreateComponent},
  { path: 'edit/:id', component: TodoItemEditComponent},
  { path: '', redirectTo: '/list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

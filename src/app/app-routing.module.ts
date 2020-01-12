import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TodoListComponent} from "./todo-list/todo-list.component";
import {TodoItemDetailComponent} from "./todo-item-detail/todo-item-detail.component";


const routes: Routes = [
  { path: 'list', component: TodoListComponent},
  { path: 'detail/:id', component: TodoItemDetailComponent},
  { path: '', redirectTo: '/list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import {TodoService} from "./service/todo.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ReactiveFormsModule} from "@angular/forms";
import { TodoItemEditComponent } from './todo-item-edit/todo-item-edit.component';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import { TodoItemCreateComponent } from './todo-item-create/todo-item-create.component';
import { StoreModule } from '@ngrx/store';
import {reducer} from "./shared/todo.reducers";
import {EffectsModule} from "@ngrx/effects";
import {TodoEffects} from "./shared/todo.effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemEditComponent,
    TodoItemCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({todoReducer: reducer}),
    EffectsModule.forRoot([TodoEffects]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

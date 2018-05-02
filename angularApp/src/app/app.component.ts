import { Component } from '@angular/core';
import { Todo } from "./todo";
import { TodoDataService } from "./todo-data.service"
import { DndModule } from 'ng2-dnd';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoDataService]
})
export class AppComponent {
  newTodo: Todo = new Todo();
  todos: Todo[]; 

  constructor (private todoDataService: TodoDataService){
    this.todos = this.getTodos();
  }

  addTodo() {
    this.todoDataService.addTodo(this.newTodo);
    this.newTodo = new Todo();
  }

  toggleTodoComplete(todo) {
    this.todoDataService.toggleTodoComplete(todo);
  }

  removeTodo(todo) {
    this.todoDataService.deleteTodoById(todo.id);
  }

  getTodos() {
    return this.todoDataService.getAllTodos();
  }

  onMove(todo: Todo, position: number) {
    this.todoDataService.moveTask(todo, position);
  }
}
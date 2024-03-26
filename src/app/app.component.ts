import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TodoService } from './services/todo.service';
import { Todo } from "./models/todo.model"
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  todolist$ = new Observable<Todo[]>();

  //form
  id = '';
  title = '';
  created = '';
  finished = '';

  constructor(private todoService: TodoService){
    this.obterTodoCadastrados();
  }

  obterTodoCadastrados(){
    this.todolist$ = this.todoService.obterTodolist();
  }

  reloadPage() {
    window.location.reload();
  }

  cadastraTodo(){
    if(!this.title)
      return;
    
    if (this.id) {
      this.editar();
      return;
    }

    this.todoService.cadastrarTodo({ title: this.title, created: this.created }).subscribe(_ => this.obterTodoCadastrados())
  }

  editar(){
    this.todoService.editarTodo({id: parseInt(this.id), title: this.title}).subscribe(_ => this.reloadPage())
  }

  preencherCampos(todo: Todo){
      this.id = todo.id!.toString();
      this.title = todo.title!;
  }

  delete(id: number){
    this.todoService.deletarTodo(id).subscribe(_ => this.reloadPage());
  }

  finish(todo: Todo){
    this.id = todo.id!.toString();
    this.todoService.finalizarTodo({id: parseInt(this.id), finished: this.finished}).subscribe(_ => this.reloadPage());
  }
}

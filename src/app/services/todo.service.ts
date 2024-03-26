import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Todo } from "../models/todo.model"


@Injectable({
    providedIn: 'root'
})

export class TodoService {

    private url = `${environment.api}/todo`

    constructor(private httpClient: HttpClient){

    }

    obterTodolist(){
        return this.httpClient.get<Todo[]>(this.url)
    }

    cadastrarTodo(todo: Todo){
        return this.httpClient.post<Todo>(this.url + '/add', todo)
    }

    editarTodo(todo: Todo){
        return this.httpClient.post<Todo>(`${this.url}/edit/${todo.id}`, todo)
    }

    deletarTodo(id: number){
        return this.httpClient.get(`${this.url}/delete/${id}`)
    }

    finalizarTodo(todo: Todo){
        return this.httpClient.post<Todo>(`${this.url}/finish/${todo.id}`, todo.finished)
    }
}
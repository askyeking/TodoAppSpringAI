import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { Todo } from "../models/todo";
import { DatePipe } from "@angular/common";
import { environment } from "../../environments/environment";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  // private baseUrl = "/TodoREST/"; // production
  // private baseUrl = "http://localhost:8085/";  // development
  private url = environment.baseUrl + "api/todos";
  private aiUrl = environment.baseUrl + "api/ai"

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    private authService: AuthService
  ) {}
  getHttpOptions() {
    let options = {
      headers: {
        Authorization: 'Basic ' + this.authService.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    return options;
  }


  index(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('TodoService.index(): error retrieving todos: ' + err)
        );
      })
    );
  }

  show(todoId:number): Observable<Todo> {
    // return this.http.get<Todo>(this.url + '/' + todoId).pipe(
    return this.http.get<Todo>(`${this.url}/${todoId}`, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('TodoService.show(): error retrieving todo: ' + err)
        );
      })
    );
  }

  create(todo: Todo): Observable<Todo> {
    todo.completed = false;
    todo.description = '';
    return this.http.post<Todo>(this.url, todo, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('TodoService.create(): error creating todo: ' + err)
        );
      })
    );
  }

  update(todo: Todo): Observable<Todo> {
    if (todo.completed) {
      todo.completeDate = this.datePipe.transform(Date.now(), 'shortDate');
    }
    else {
      todo.completeDate = '';
    }
    // return this.http.put<Todo>(this.url+'/'+todo.id, todo).pipe(
    return this.http.put<Todo>(`${this.url}/${todo.id}`, todo, this.getHttpOptions() ).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('TodoService.update(): error updating todo: ' + err)
        );
      })
    );
  }

  destroy(todoId: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${todoId}` , this.getHttpOptions() ).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('TodoService.delete(): error destroying todo: ' + err)
        );
      })
    );
  }

  getSuggestions(): Observable<string[]> {
    return this.http.get<string[]>(this.aiUrl + '/suggestions', this.getHttpOptions()).pipe(
      catchError((err) => {
        console.log(err);
        return throwError(() => new Error('TodoService.getSuggestions(): error getting suggestions:  ' + err));
      })
    );
  }

}

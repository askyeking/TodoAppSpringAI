import { Component, OnInit } from "@angular/core";
import { Todo } from "../../models/todo";
import { CommonModule } from "@angular/common";
import { TodoService } from "../../services/todo.service";
import { FormsModule } from "@angular/forms";
import { IncompletePipe } from "../../pipes/incomplete.pipe";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-todo-list",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IncompletePipe
  ],
  templateUrl: "./todo-list.component.html",
  styleUrl: "./todo-list.component.css",
})
export class TodoListComponent implements OnInit {
  title = "ngTodo";
  todos: Todo[] = [];
  selected: Todo | null = null;
  newTodo: Todo = new Todo();
  editTodo: Todo | null = null;
  showComplete: boolean = false;
  suggestions: string[] = [];

  constructor(
    private todoService: TodoService,
    private incompletePipe: IncompletePipe,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSuggestions();
    this.reload();
    this.activatedRoute.paramMap.subscribe(
      {
        next: (params) => {
          let todoIdStr = params.get("todoId");
          
          if ( todoIdStr ) {
            let todoId = parseInt(todoIdStr);
            if (isNaN(todoId)) {
              this.router.navigateByUrl('invalidTodoId');
            }
            else {
             this.getTodo(todoId);
            }
          }
        }
      }
    );
  }

  addSuggestion(suggestion: string, index: number) : void {


    let todo = new Todo();
    todo.task = suggestion;
    
    this.todoService.create(todo).subscribe( {
      next: (addedTodo) => {
     
        this.reload();
        this.suggestions.splice(index, 1);
      },
      error: (ohno) => {
        console.error('TodoListComponent.addTodo: error adding');
        console.error(ohno);
      }
    } );
  } 
  getTodo(todoId: number) {
    this.todoService.show(todoId).subscribe( {
      next: (todo) => {
        this.selected = todo;
      },
      error: (oops) => {
        console.error('TodoListComponent.getTodo: error getting todo');
        console.error(oops);
        this.router.navigateByUrl('todoNotFound');
      }
    } );
  }
  displayTodo(todo: Todo): void {
    // this.selected = todo;
    this.getTodo(todo.id);
  }

  reload() {
    this.todoService.index().subscribe( {
      next: (todoList) => {
        this.todos = todoList;
      },
      error: (oopsy) => {
        console.error('TodoComponent.reload(): error getting todo list');
        console.error(oopsy);
      }
    } );
  }

  getTodoCount(): number {
    return this.incompletePipe.transform(this.todos).length;
  }


  setEditTodo() {
    if (this.selected) {
      // this.editTodo = {...this.selected};
      this.editTodo = Object.assign({}, this.selected);
    }
  }

  displayTable(): void {
    this.selected = null;
  }

  addTodo(todo: Todo) {
    this.todoService.create(todo).subscribe( {
      next: (createdTodo) => {
        this.newTodo = new Todo();
        this.reload();
      },
      error: (ohno) => {
        console.error('TodoListComponent.addTodo: error adding');
        console.error(ohno);
      }
    } );
  }

  updateTodo(editTodo: Todo, goToSelected: boolean = true) {
    this.todoService.update(editTodo).subscribe( {
      next: (updatedTodo) => {
        if (goToSelected) {
          this.selected = updatedTodo;
        }
        this.editTodo = null;
        this.reload();
      },
      error: (fail) => {
        console.error('TodoListComponent.updateTodo: failed to update');
        console.error(fail);
      }
    } );
  }

  deleteTodo(todoId: number) {
    this.todoService.destroy(todoId).subscribe( {
      next: () => {
        this.reload();
      },
      error: (nojoy) => {
        console.error('TodoListComponent.deleteTodo: error');
        console.error(nojoy);
      }
    } );
  }

  getSuggestions() {
    this.todoService.getSuggestions().subscribe({
      next: (suggestions) => {
        this.suggestions = suggestions;
        console.log(suggestions);
      },
      error: (nojoy) => {
        console.error('TodoListComponent.deleteTodo: error');
        console.error(nojoy);
      }
    });
  }

}

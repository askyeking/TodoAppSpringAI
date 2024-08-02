import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../models/todo';

@Pipe({
  name: 'incomplete',
  standalone: true
})
export class IncompletePipe implements PipeTransform {

  transform(todos: Todo[], showComplete: boolean = false): Todo[] {
    if (showComplete) {
      return todos;
    }
    return todos.filter(t => ! t.completed);
  }

}

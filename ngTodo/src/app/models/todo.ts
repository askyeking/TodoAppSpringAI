export class Todo {
  id: number;
  task: string;
  description: string;
  completed: boolean;
  completeDate: string | null;

  constructor(
    id: number = 0,
    task: string = '',
    description: string = '',
    completed: boolean  = false,
    completeDate: string = ''
  ){
    this.id = id;
    this.task = task;
    this.description = description;
    this.completed = completed;
    this.completeDate = completeDate;
  }
}

/* 
Object type for Todo list application
id and completed are optional properties
*/
export type Todo = {
  // id for each task
  id?: string;
  // todo task
  task: string;
	// indicates if a task is completed or not
  completed?: boolean;
};

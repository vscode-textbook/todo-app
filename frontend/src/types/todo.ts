/* 
Object type for Todo list application
*/
export type Todo = {
  /** @description id for each task */
  id: string;
  /** @description todo task */
  task: string;
  /** @description indicates if a task is completed or not */
  completed: boolean;
};

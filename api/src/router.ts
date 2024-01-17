import { Router } from 'express'
import { TodoHandler } from './handler'

const router: Router = Router()
const handler = new TodoHandler();

router.get('/todos', handler.GetTodos)
router.post('/todos', handler.AddTodo)
router.put('/todos/:id', handler.UpdateTodo)
router.delete('/todos/:id', handler.DeleteTodo)

export default router

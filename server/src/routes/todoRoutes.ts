import { Router } from 'express';
import { TodoController } from '../controllers/TodoController';
import { authenticate } from '../middleware/auth';

const router = Router();
const todoController = new TodoController();

// Apply authentication to all routes
router.use(authenticate);

router.route('/').post(todoController.createTodo).get(todoController.getTodos);

router.route('/:id').get(todoController.getTodo).put(todoController.updateTodo).delete(todoController.deleteTodo);

router.patch('/:id/status', todoController.updateStatus);
router.post('/:id/tags', todoController.addTags);
router.delete('/:id/tags', todoController.removeTags);

export default router;

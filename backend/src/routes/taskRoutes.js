import express from 'express';
import {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  deleteCompletedTasks,
  toggleTaskStatus,
  getTaskStats,
} from '../controllers/taskController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.route('/').get(getTasks).post(createTask);
router.route('/stats').get(getTaskStats);
router.route('/completed').delete(deleteCompletedTasks);
router.route('/:id/toggle').patch(toggleTaskStatus);
router.route('/:id').get(getTask).put(updateTask).delete(deleteTask);

export default router;

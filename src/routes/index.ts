import express from 'express';
const router = express.Router();
import indexRouter from './index.route';
import userRouter from './user.route';

router.use('/', indexRouter);
router.use('/user', userRouter);

export default router;

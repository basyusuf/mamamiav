import express from 'express';
const router = express.Router();
import userController from '../controller/user.controller';

/* GET users listing. */
router.get('/', userController.sayHello);

export default router;

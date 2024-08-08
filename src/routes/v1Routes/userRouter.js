import express from 'express';
import userController from '../../controllers/userController.js';
import authenticateAdmin from '../../middleware/adminmiddleware.js';

const userRouter = express.Router();

userRouter.get('/ping', userController.ping);
userRouter.get('/get-users',authenticateAdmin, userController.getAllUsers);
userRouter.get('/:id', authenticateAdmin, userController.getUserById);
userRouter.post('/signup', userController.signup);
userRouter.post('/signin', userController.signin);
userRouter.put('/:id', userController.updateUser);

export default userRouter;

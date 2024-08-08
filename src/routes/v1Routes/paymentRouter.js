import express from 'express';
import paymentControllers from '../../controllers/paymentController.js';


const paymentRouter = express.Router();

paymentRouter.post('/payments', paymentControllers.createPayment);
paymentRouter.put('/payments/:id', paymentControllers.updatePayment);
paymentRouter.get('/payments/:id', paymentControllers.getPaymentById);
paymentRouter.get('/payments', paymentControllers.getAllPayments);

export default paymentRouter;

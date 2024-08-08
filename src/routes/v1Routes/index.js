import express from 'express';

import userRouter from './userRouter.js';
import productRouter from './productRouter.js';
import orderRouter from './orderRouter.js';
import categoryRouter from './categoryRouter.js';
import PaymentRouter from './paymentRouter.js';
import cartRouter from './cartRouter.js';
import shipmentRouter from './shipmentRouter.js';
import reviewRouter from './reviewRouter.js';


const v1Router = express.Router();
v1Router.use("/users",userRouter);
v1Router.use("/products",productRouter);
v1Router.use("/orders",orderRouter);
v1Router.use("/categorys",categoryRouter);
v1Router.use("/payments",PaymentRouter);
v1Router.use("carts",cartRouter);
v1Router.use("/shipments",shipmentRouter);
v1Router.use("/review",reviewRouter);

export default v1Router;

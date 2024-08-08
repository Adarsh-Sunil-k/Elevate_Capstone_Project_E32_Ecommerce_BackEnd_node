import express from "express";
import orderControllers from "../../controllers/orderController.js"
const orderRouter = express.Router();

orderRouter.get("/",orderControllers.ping);
orderRouter.post("/create-order",orderControllers.createOrder);
orderRouter.get("/get-order/:id",orderControllers.getOrderById);
orderRouter.get("/get-all-orders",orderControllers.getAllOrders);
orderRouter.delete("/delete-order/:id",orderControllers.deleteOrder);
orderRouter.put("/update-order/:id",orderControllers.updateOrder);

export default orderRouter;
import express from 'express';
import shipmentControllers from '../../controllers/shipmentController.js';

const shipmentRouter = express.Router();

shipmentRouter.post('/shipments', shipmentControllers.createShipment);
shipmentRouter.put('/shipments/:id', shipmentControllers.updateShipment);
shipmentRouter.get('/shipments/:id', shipmentControllers.getShipmentById);
shipmentRouter.get('/shipments', shipmentControllers.getAllShipments);

export default shipmentRouter;

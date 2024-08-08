import express from 'express';
import cartControllers from '../../controllers/cartController.js';


const cartRouter = express.Router();

cartRouter.post('/add-to-cart', cartControllers.createCart);
cartRouter.put('/update-cart', cartControllers.updateCart);
cartRouter.delete('/delete-from-cart', cartControllers.DeleteProduct);
cartRouter.get('/cart/:id', cartControllers.getCart);

export default cartRouter;

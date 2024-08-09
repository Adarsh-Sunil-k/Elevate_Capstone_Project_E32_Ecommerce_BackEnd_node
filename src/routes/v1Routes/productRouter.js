import express from "express";
import productControllers from "../../controllers/productController.js";
import upload from "../../middleware/uploadMiddleware.js";

const productRouter = express.Router();

productRouter.get("/",productControllers.ping);
productRouter.post("/create",upload.single("image"),productControllers.createProduct);
productRouter.get("/get-product/:id",productControllers.getProductById);
productRouter.get("/get-all-products",productControllers.getAllProducts);
productRouter.put("/update-product/:id",productControllers.updateProduct);
productRouter.delete("/delete-product/:id",productControllers.deleteProduct);
productRouter.delete('/products/:id/soft-delete',productControllers.softDelete);
productRouter.get('/products/:id/restore', productControllers.restoreProduct);


export default productRouter ;


import express from "express"
import categoryController from "../../controllers/categoryController.js";


const categoryRouter = express.Router();

categoryRouter.get("/",categoryController.ping);
categoryRouter.post("/create-category",categoryController.createCategory);
categoryRouter.get("/get-all-category",categoryController.getAllCategory);
categoryRouter.get("/get-category/:id",categoryController.getCategoryById);
categoryRouter.put("/update-category/:id",categoryController.updateCategory);
categoryRouter.delete("/delete-category/:id",categoryController.deleteCategory);

export default categoryRouter 
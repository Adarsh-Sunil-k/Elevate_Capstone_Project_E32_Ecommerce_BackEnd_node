import express from "express"
import categoryController from "../../controllers/categoryController.js";
import authenticateAdmin from "../../middleware/adminmiddleware.js";

const categoryRouter = express.Router();

categoryRouter.get("/",categoryController.ping);
categoryRouter.post("/create-category",authenticateAdmin,categoryController.createCategory);
categoryRouter.get("/get-all-category",categoryController.getAllCategory);
categoryRouter.get("/get-category",categoryController.getCategoryById);
categoryRouter.put("/update-category",categoryController.updateCategory);
categoryRouter.delete("/delete-category",categoryController.deleteCategory);

export default categoryRouter 
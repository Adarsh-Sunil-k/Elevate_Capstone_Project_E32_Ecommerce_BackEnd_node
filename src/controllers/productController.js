import Product from "../models/productSchema.js"
import cloudinaryInstance from "../config/cloudinaryConfig.js";
import Category from "../models/categorySchema.js"


const ping = (req,res)=>{
    res.send("successfully routed product-router");
}
const createProduct = async (req, res) => {

  try {
    // console.log("hitted");
    if(!req.file) {
    return res.json({message:"file is not visible"})
    }

    cloudinaryInstance.uploader.upload(req.file.path, async (err, result) => {
      if (err) {
        // console.log({error: err});
        return res.status(500).json({
          success: false,
          message: "Error",
        });
      }
      // console.log("result",result);
      const imageUrl = result.url;
      
      const { name, description, category, price,stock } = req.body;

      const categoryExists = await Category.findById(category);
      console.log(category);
      
      if (!categoryExists) {
        return res.status(400).json({ message: "Category does not exist" });
      }

      const createProduct = new Product({
        name,
        description,
        price,
        stock,
        category,
        image: imageUrl,
      }
  );
      const newProductCreated = await createProduct.save();
      if (!newProductCreated) {
        return res.json({message:"product is not created"});
      }
      return res.json({message:newProductCreated});
    });
  } catch (error) {
    // console.log("something went wrong");
    res.json({message:"failed to create Product"});
  }
};

const getAllProducts = async (req, res) => {
    try {
      const products = await Product.find({ isDeleted: false }).populate('category');
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message:"products not find"});
    }
  };

const getProductById = async (req, res) => {
    const { id } = req.params;
  
    try {
      // console.log(id);
  
      const product = await Product.findById({ _id: id, isDeleted: false }).populate('category');
      if (!product) return res.status(404).json({ message: "Product not found" });
  
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const { name, price, discription, stock } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: id },
      {
        name,
        price,
        discription,
        stock,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({message:"Product not found or not updated"});
    }

    console.log(updatedProduct);
    return res.status(200).json({message:updatedProduct});
  } catch (error) {
    console.error(error);
    return res.status(500).json({message:"Internal Server Error"});
  }
};

  const deleteProduct = async (req, res) => {
    const { id } = req.params;
  
    try {
      // console.log(id);
  
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
  
      res.status(200).json({ message: "Product deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message:"product not deleted" });
    }
  };

  const restoreProduct = async (req, res) => {
    const { id } = req.params;
  
    try {
      const product = await Product.findByIdAndUpdate(id, { isDeleted: false }, { new: true });
      if (!product) return res.status(404).json({ message: "Product not found" });
  
      res.status(200).json({ message: "Product restored successfully", product });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const softDelete = async (req, res) => {
    const { id } = req.params;
  
    try {
      const product = await Product.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
      if (!product) return res.status(404).json({ message: "Product not found" });
  
      res.status(200).json({ message: "Product soft deleted successfully", product });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const productControllers = {
    ping,
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    restoreProduct,
    softDelete
  }

  export default productControllers ; 



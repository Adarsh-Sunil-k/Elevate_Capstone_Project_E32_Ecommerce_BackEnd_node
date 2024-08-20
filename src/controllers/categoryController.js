import Category from "../models/categorySchema.js";

const ping = (req,res)=>{
    res.send("Router Hitted CategoryRouter");
}
// creation
const createCategory = async(req, res)=>{
    const {name, description} = req.body
    console.log(name);
    
    try{
        const categoryExist = await Category.findOne({name});
        if(categoryExist){
            return res.json({message:"Catagory All Ready Exist"});
        }

        const createNewCategory =  new Category({
            name,
            description
        });

        if(!createNewCategory){
            console.log(createNewCategory);
            res.json({message:"unexpected error occure"});  
        }

       const addCategory = await createNewCategory.save();
       res.json(addCategory);
    }catch(error){
    console.log("err",error.message);
    res.status(500).json({message:"internal server error"});
    }
}

// getAllCategory
const getAllCategory = async (req,res)=>{
    try{
        const categorys = await Category.find();
        if(!categorys){
            return res.json({message:"categorys not get"}) 
        }
        res.status(200).json(categorys)
    }catch(error){
        // console.log("Error",error);
        res.status(500).json({message:error.message})
    }
}

// getCategoryById
const getCategoryById = async (req,res)=>{
    const {id} = req.params
    try{
        const category = await Category.findById(id)
        if(!category){
            return res.send("category not found");
        }
        // console.log(category);
        res.status(200).json(category);  
    }catch(err){
        // console.log(err);
        res.status(500).json({message:err.message})
    }
}

// update category
const updateCategory = async (req,res)=>{
    const {id} = req.params
    // console.log({id});

    const {name,description} = req.body
    // console.log(name,description);
    
    try{
        const findCategory = await Category.findByIdAndUpdate(id,
           { name,
            description},
        
        {
            new:true
        })
        if(!findCategory) return res.send("category not found");
        // console.log(findCategory);
        
        res.status(200).json(findCategory)
    }catch(err){
        console.log("Error",err);
        res.status(500).json({message:err.message})
    }
}

// delete category
const deleteCategory = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Delete category
      const deletedCategory = await Category.findByIdAndDelete(id);
  
      if (!deletedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
  
      res.status(200).json({ message: "Category deleted successfully",deletedCategory});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const categoryController = {
    ping,
    createCategory,
    getAllCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
}

export default categoryController;
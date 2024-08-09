import User from "../models/userSchema.js"
import generateToken from "../utils/generateToken.js";
import bcrypt from 'bcrypt'


const ping = (req,res)=>{
  res.send("sucessfully routed user-router");
};

const signup = async (req, res) => {
  try {
    const { email, password, confirmPassword, firstName, lastName, phone } = req.body
    if (password !== confirmPassword) {
      return res.status(400).json({message:"Passwords do not match"});
    }

    const userExist = await User.findOne( {email} );
    
    
    if (userExist) {
      return res.json({message:"User is already exist"});
    }
    
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      email,
      firstName,
      lastName,
      phone,
      role:"user",
      hashPassword,
    });
    
    const newUserCreated = await newUser.save();

    if (!newUserCreated) {
      return res.json({message:"user is not created"});
    }

    const token = generateToken(email);
    console.log(token);
    
    res.cookie("token", token)
    res.json({message:"Signed successfully!"});
  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).json({message:"Internal Server Error"});
  }
};

const signin = async (req,res)=>{
  try{
    const {email,password} = req.body
    console.log(email);
    console.log(password);
    const user = await User.findOne({email});
    if(!user){
      return res.json({message:"User Not Found"});
    }
    const matchPassword = await bcrypt.compare(password, user.hashPassword);
    if(!matchPassword){
      return res.json({message:"Password Not Match"});
    }
    const token = generateToken(email);
    res.cookie(token);
    console.log(token)
    res.json({message:"Sucessfully Login"});
  } catch(error){
    console.log(error,"something Went Wrong");
    res.status(500).json({message:"Internal Server Error"});
  }
};

const updateUser = async (req, res) => {
    try {
      const { firstName, lastName } = req.body;
      const id = req.params.id
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { firstName, lastName },
        { new: true }
      ).select('-hashPassword');;
      if (!updatedUser) return res.status(404).json({ message: "User not found" });
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "updation failed "});
    }
  };


  const getUserById = async (req, res) => {
    try {
      const id = req.params.id
      const user = await User.findById(id).select('-hashPassword');;
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message:"cant find user" });
    }
  };

  const getAllUsers = async (req, res) => {
    try {
      const users = await User.find().select('-hashPassword');;
      // console.log(users);
      if(!users){
        return res.json({message:"user not find"});
    }
      
      res.status(200).json([users]);
    } catch{
      res.status(500).json({ message: "Unexpected error" });
    }
  };

  const userControllers = {
    ping,
    signup,
    signin,
    updateUser,
    getAllUsers,
    getUserById
  }

  export default userControllers ;

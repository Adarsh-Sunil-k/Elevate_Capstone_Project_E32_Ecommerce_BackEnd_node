import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            require:true,
            unique:true,
            minLength:3,
            maxLength:30,
        },
        hashPassword: {
            type: String,
            required: true,
            minLength: 6,
          },
        firstName:{
            type:String,
            require:true,
            maxLength:50,
        },
        lastName:{
            type:String,
            require:true,
            maxLength:50,
        },
        phone:{
            type:Number,
            require:true,
            minLength:10,
            maxLength:12
        },
            role: {
            type: String,
            enum: ["user", "admin"],
          },

        orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
        cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
        wishlist: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    },
    { timestamps:true }
);

userSchema.set('toJSON', {
    transform: (doc, ret) => {
      delete ret.hashPassword;
      return ret;
    }
  });
  
const User = mongoose.model("User", userSchema);

export default User;
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    image: {
        type: String,

   },
    name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: [
    { type: mongoose.Schema.Types.ObjectId,
    ref: "Category" }
    ],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    stock: { 
        type: Number,
        required: true,
        default: 0
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;

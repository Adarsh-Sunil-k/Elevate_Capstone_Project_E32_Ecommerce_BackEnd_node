import Review from "../models/reviewSchema.js";
import User from "../models/userSchema.js";
import Product from "../models/productSchema.js";

// Create a review
const createReview = async (req, res) => {
  const { user, product, rating, comment } = req.body;

  try {
    const userExist = await User.findById(user);
    if (!userExist) return res.status(404).json({ message: "User not found" });

    const productExist = await Product.findById(product);
    if (!productExist) return res.status(404).json({ message: "Product not found" });

    const newReview = new Review({
      user,
      product,
      rating,
      comment,
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a review
const updateReview = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  try {
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { rating, comment },
      { new: true }
    );

    if (!updatedReview) return res.status(404).json({ message: "Review not found" });

    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a review by ID
const getReviewById = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findById(id).populate("user product");
    if (!review) return res.status(404).json({ message: "Review not found" });

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("user product");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findByIdAndDelete(id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const reviewControllers = {
  createReview,
  updateReview,
  getReviewById,
  getAllReviews,
  deleteReview,
};

export default reviewControllers;

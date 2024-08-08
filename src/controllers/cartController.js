import Cart from "../models/cartSchema.js";
import Product from "../models/productSchema.js";
import User from "../models/userSchema.js";

// create cart
const createCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const user = await User.findById({userId});
    if (!user) return
     res.status(404).json({ message: "User not found" });

    const product = await Product.findById(productId);
    if (!product) return
     res.status(404).json({ message: "Product not found" });
    
    let cart = await Cart.findOne(userId);

    if (cart) {
      //product already exists in the cart
      const productExixt = cart.products.findIndex(p => p.product.toString() === productId);

      if (productExixt > -1) {
        // update Quantity
        cart.products[productExixt].quantity += quantity;
      } else {
        // add new product to the product array
        cart.products.push( productId, quantity);
      }
    } else {
      //  cart not exist, create new cart for te user
      cart = new Cart({
        user: userId,
        products: [{ product: productId, quantity }]
      });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update product quantity in the cart
const updateCart = async (req, res) => {
  const { user, productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({user});

    if (cart) {
      const productExixt = cart.products.findIndex(p => p.product.toString() === productId);

      if (productExixt > -1) {
        cart.products[productExixt].quantity = quantity;
        await cart.save();
        return res.status(200).json(cart);
      } else {
        return res.status(404).json({ message: "Product not found in cart" });
      }
    } else {
      return res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete product in the cart
const DeleteProduct = async (req, res) => {
  const { user, productId } = req.body;

  try {
    const cart = await Cart.findOne({user});

    if (cart) {
      cart.products = cart.products.filter(p => p.product.toString() !== productId);

      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get the user's cart
const getCart = async (req, res) => {
  const { user } = req.params;

  try {
    const cart = await Cart.findOne({user}).populate("products.product");

    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const cartControllers = {
  createCart,
  updateCart,
  DeleteProduct,
  getCart
};

export default cartControllers;

import Order from "../models/orderSchema.js";



const ping = (req,res)=>{
    res.send("sucessfully routed order-router");
  };
// Create a new order
const createOrder = async (req, res) => {
  const { user, products, totalAmount, status, paymentMethod, shippingAddress } = req.body;

  try {
    // console.log(totalAmount, status);

    const newOrder = new Order({
      user,
      products,
      totalAmount,
      status,
      paymentMethod,
      shippingAddress,
    });

    const newOrderCreated = await newOrder.save();
    // console.log(newOrderCreated);
    
    if(!newOrderCreated){
      return res.json({message:"order not created"});
    }
    res.status(201).json(newOrderCreated)
    //console.log("order created successfully");
    
  } catch (error) {
    // console.log("error");
    
    res.status(400).json({ message: "internel server error" });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user products.product paymentMethod shippingAddress');
    if(!orders){
      return res.json({message:"no order found"});
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error});
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    // console.log(id);

    const order = await Order.findById(id).populate('user products.product paymentMethod shippingAddress');
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order
const updateOrder = async (req, res) => {
    const { id } = req.params; 
  
    const { products, totalAmount,shippingAddress } = req.body;
  
    try {
      // console.log(id, products, totalAmount,  shippingAddress);
      const updatedOrder = await Order.findByIdAndUpdate(
        {_id:id},
        { products, totalAmount,shippingAddress},
        { new: true }
      );
  
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

// Delete order
const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    // console.log(id);

    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const orderControllers = {
    ping,
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
}

export default orderControllers;

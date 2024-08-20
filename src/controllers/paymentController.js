import Payment from "../models/paymentSchema.js";
import Order from "../models/orderSchema.js";
// import razorpayInstance from "../config/razorpayConfig.js";
// import *as crypto from "crypto"


// Create a payment
const createPayment = async (req, res) => {
  const { order, amount, method, status } = req.body;

  try {
    const orderExist = await Order.findById(order);
    if (!orderExist) return 
        res.status(404).json({ message: "Order not found" });

    const newPayment = new Payment({
      order,
      amount,
      method,
      status,
    });

    const newPaymentCreated = await newPayment.save();
    if(!newPaymentCreated) {
        return res.json({message:"payment not created"}) 
    }
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// create Paymeny
// const order = async (req,res)=>{
//   const {amount} = req.body ;

//   try{
//     const options = {
//       amount: Number(amount * 100),
//       currency : "INR",
//       recipt: crypto.randomBytes(10).toString("hex"),
//     };
//     razorpayInstance.orders.create(options,(error , order)=>{
//       if(error){
//         console.log(error);
//         return res.status(500).json({message:"Something went Wrong"}); 
//       }
//       console.log(order);
//       return res.status(200).json({data:order})
//     });
//   }catch(error){
//     res.status(500).json({message:error.message})
//     console.log("error",error.message);
//   }
// };

// Update  payment
const updatePayment = async (req, res) => {
  const { id } = req.params;
  const { amount, method, status } = req.body;

  try {
    const updatedPayment = await Payment.findByIdAndUpdate(
      id,
      { amount, method, status },
      { new: true }
    );

    if (!updatedPayment) return res.status(404).json({ message: "Payment not found" });

    res.status(200).json(updatedPayment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a payment by ID
const getPaymentById = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await Payment.findById(id).populate("order");
    if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate("order");
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const paymentControllers = {
  createPayment,
  updatePayment,
  getPaymentById,
  getAllPayments
};

export default paymentControllers;

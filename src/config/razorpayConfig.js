import dotenv from "dotenv"
import Razorpay from "razorpay";

dotenv.config();

var razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "",
    key_secret: process.env.RAZORPAY_SECRET || "",
  });

  export default razorpayInstance ;
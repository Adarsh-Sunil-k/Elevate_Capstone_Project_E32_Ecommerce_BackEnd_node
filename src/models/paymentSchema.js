import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    // order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    amount: {
        type: Number,
        required: true
    },
   method: {
        type: String,
        required: true,
        enum:["Credit Card","Debit Card", "UPI", "Net Banking", "Cash On Delivery"], default:"Cash On Delivery"
    },
    status: {
        type: String,
        required: true,
        enum: ["Pending", "Paid", "Failed"], default: "Pending",
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    products: [
      {
        product: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
      }
    ],
    shippingAddress: {
      shipment :{ type: mongoose.Types.ObjectId, ref: "Shipment", require: true},
    },
    totalAmount: { 
        type: Number, 
         required: true,
         status: { type: String, enum: ["Pending", "Completed", "Shipped", "Cancelled"], default: "Pending" },
     },
    paymentMethod: {
      payment :{ type: mongoose.Types.ObjectId, ref: "Payment", require: true}
      
    },

}, {
    timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

export default Order;

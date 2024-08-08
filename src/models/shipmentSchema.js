import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema(
  {
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    address: {
        type: String,
        required: true
    },
    carrier: {
        type: String
    },
    shippingDate: {
        type: Date
    },
    deliveryDate: {
        type: Date
    },
    status: {
        type: String,
        required: true,
        default: "Pending"
    },
  },
  { timestamps: true }
);

const Shipment = mongoose.model("Shipment", shipmentSchema);

export default Shipment;

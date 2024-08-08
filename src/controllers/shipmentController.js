import Shipment from "../models/shipmentSchema.js";
import Order from "../models/orderSchema.js";

// Create  shipment
const createShipment = async (req, res) => {
  const { order, address,shippingDate, deliveryDate, status } = req.body;

  try {
    const orderExist = await Order.findById(order);
    if (!orderExist) return res.status(404).json({ message: "Order not found" });

    const newShipment = new Shipment({
      order,
      address,
      shippingDate,
      deliveryDate,
      status,
    });

    await newShipment.save();
    if(!newShipment){
        return res.json({message:"shipment not created"})
    }
    res.status(201).json(newShipment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update  shipment
const updateShipment = async (req, res) => {
  const { id } = req.params;
  const { address,shippingDate, deliveryDate, status } = req.body;

  try {
    const updatedShipment = await Shipment.findByIdAndUpdate(
      id,
      { address,shippingDate, deliveryDate, status },
      { new: true }
    );

    if (!updatedShipment) return res.status(404).json({ message: "Shipment not found" });

    res.status(200).json(updatedShipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get  shipment by ID
const getShipmentById = async (req, res) => {
  const { id } = req.params;

  try {
    const shipment = await Shipment.findById(id).populate("order");
    if (!shipment) return res.status(404).json({ message: "Shipment not found" });

    res.status(200).json(shipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all shipments
const getAllShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find().populate("order");
    res.status(200).json(shipments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const shipmentControllers = {
  createShipment,
  updateShipment,
  getShipmentById,
  getAllShipments
};

export default shipmentControllers;

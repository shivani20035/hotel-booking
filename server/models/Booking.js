import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({

    user:  { type: String ,ref: "User",  required: true }, // ✅ ObjectId not String
    room:  { type: mongoose.Schema.Types.ObjectId, ref: "Room",  required: true }, // ✅ ObjectId not String
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true }, // ✅ ObjectId not String

    checkInDate:  { type: Date, required: true },  // ✅ Date not Data
    checkOutDate: { type: Date, required: true },  // ✅ Date not String

    totalPrice: { type: Number, required: true },
    guests:     { type: Number, required: true },

    status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled"],
        default: "pending",
    },
    paymentMethod: {
        type: String,
        required: true,
        default: "pending",
    },
    isPaid: { type: Boolean, default: false },

}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema); // ✅ "Booking" not "Room"
export default Booking;                                   // ✅ Booking not booking
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js"; 

export const createHotel = async (req, res, next) => {
    try {
        const newHotel = new Hotel(req.body);
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (error) {
        next(createError(500, "Failed to create hotel"));
    }
};

export const updatedHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedHotel) {
            return next(createError(404, "Hotel not found"));
        }

        res.status(200).json(updatedHotel);
    } catch (error) {
        next(createError(500, "Failed to update hotel"));
    }
};

export const deleteHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findByIdAndDelete(req.params.id);
        if (!hotel) {
            return next(createError(404, "Hotel not found"));
        }
        res.status(200).json({ message: "Hotel has been deleted" });
    } catch (error) {
        next(createError(500, "Failed to delete hotel"));
    }
};

export const getHotels = async (req, res, next) => {
    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    } catch (error) {
        next(createError(500, "Failed to fetch hotels"));
    }
};

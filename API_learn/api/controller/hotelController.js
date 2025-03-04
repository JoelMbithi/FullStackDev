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
    const { min, max, ...others } = req.query
    try {
        const hotels = await Hotel.find({
            ...others,
            cheapestPrice: { $gt: min || 1, $lt: max || 9990976 }
        }).limit(req.query.limit);
        res.status(200).json(hotels);
    } catch (error) {
        next(createError(500, "Failed to fetch hotels"));
    }
};


export const countByCity  = async (req,res,next) => {
    try {
        const cities = req.query.cities.split(",")

        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}

export const countByType = async (req,res,next) => {
              try {
                const hotelCount = await Hotel.countDocuments({type : "hotel"})
                const apartmentCount = await Hotel.countDocuments({type: "apartment"})
                 const resortCount = await Hotel.countDocuments({type: "resort"})
                 const villaCount = await Hotel.countDocuments({type: "vila"})
                 const cabinCount = await Hotel.countDocuments({type: "cabin"})
                

                 res.status(200).json([
                    {type: "hotel", count: hotelCount},
                    {type: "apartment", count: apartmentCount},
                    {type: "resort", count: resortCount},
                    {type: "vila", count: villaCount},
                    { type: "cabin", count: cabinCount},
                 ])
              } catch (error) {
                next(error)
              }
}
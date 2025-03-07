import Room from "../models/Room.js"
import Hotel from "../models/Hotel.js"
import { createError } from "../utils/error.js"


export const createRooms = async (req,res,next) => {
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body) 

    try {
        const savedRoom = await newRoom.save()
        try{
            await Hotel.findByIdAndUpdate(hotelId, {
                $push: { rooms: savedRoom._id},
            })
        }catch(error) {
            next(error)
        }
        res.status(200).json(savedRoom)
    }catch (error) {
        next(error)
    }
}


export const updateRooms = async (req,res,next) => {
    try {

        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        )
        res.status(200).json(updatedRoom)
        
    } catch (error) {
        next(error)
    }
}
export const updateRoomsAvailable = async (req, res, next) => {
    try {
        await Room.updateOne(
            { "roomNumbers._id": req.params.id },
            {
                $push: {
                    "roomNumbers.$.unavailableDates": req.body.dates
                }
            }
        );

        res.status(200).json({ message: "Room availability updated successfully" });
    } catch (error) {
        next(error);
    }
}

export const deleteRoom = async (req, res, next) => {
    try {
        const { hotelId, id } = req.params;

        // Delete the room
        const deletedRoom = await Room.findByIdAndDelete(id);
        if (!deletedRoom) {
            return next(createError(404, "Room not found"));
        }

        // Remove the room from the hotel's rooms array
        await Hotel.findByIdAndUpdate(hotelId, {
            $pull: { rooms: id }
        });

        res.status(200).json({ message: "Room deleted successfully" });
    } catch (error) {
        next(error);
    }
};


export const getRoom = async (req,res,next) => {
    try {
        const room = await Room.findById(req.params.id)
        res.status(200).json(room)
    } catch (error) {
        next(error)
    }
}

export const getRooms = async (req,res,next) => {
    try {
        const rooms = await Room.find()
        res.status(200).json(rooms)
    } catch (error) {
        next(error)
    }
}
import db from "../utils/db.js";
import cloudinary from 'cloudinary';

export const create = async (req, res) => {
    const { name, location, price, description, type } = req.body;
    
    try {
        let imageUrl = null;
        
        // If there's an uploaded file, upload it to Cloudinary
        if (req.file) {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'apartments' // optional folder in Cloudinary
            });
            imageUrl = result.secure_url;
        }

        const query = await db.query(
            `INSERT INTO apartments (name, location, price, type, description, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [name, location, price, type, description, imageUrl]
        );

        const newApartment = query.rows[0];

        res.status(201).json({
            message: "Apartment created successfully",
            success: true,
            apartment: newApartment,
        });
    } catch (error) {
        console.error("Error creating apartment:", error);
        res.status(500).json({
            message: "Error creating apartment",
            success: false,
        });
    }
};

export const getApartment = async (req, res) => {
    try {
        const query = await db.query(
            `SELECT * FROM apartments`
        )
        const apartments = query.rows;
    
        res.status(200).json({
            message: "Apartments fetched successfully",
            success: true,
            apartments: apartments,
        });
    } catch (error) {
        console.error("Error fetching apartments:", error);
        res.status(500).json({
            message: "Error fetching apartments",
            success: false,
        });
    }
}
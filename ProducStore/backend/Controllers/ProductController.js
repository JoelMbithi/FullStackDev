import { pool } from "../config/db.js";

export const createProduct = async (req, res) => {
    const { name, image, price } = req.body;

    // Validation
    if (!name || !image || !price) {
        return res.status(400).json({
            message: "All fields are required",
            success: false
        });
    }

    try {
        const result = await pool.query(
            'INSERT INTO products (name, image, price) VALUES ($1, $2, $3) RETURNING *',
            [name, image, price]
        );
        console.log("New product added", result.rows[0]);
        res.status(201).json({
            message: "Product successfully created",
            data: result.rows[0],
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
            success: false
        });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
        console.log("All products", result.rows);
        res.status(200).json({
            message: "All products",
            data: result.rows,
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

export const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
        console.log("Product", result.rows[0]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Product not found",
                success: false
            });
        }
        res.status(200).json({
            message: "Product retrieved successfully",
            data: result.rows[0],
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, image, price } = req.body;

    try {
        const result = await pool.query(
            'UPDATE products SET name = $1, image = $2, price = $3 WHERE id = $4 RETURNING *',
            [name, image, price, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Product not found",
                success: false
            });
        }

        console.log("Product updated", result.rows[0]);
        res.status(200).json({
            message: "Product updated successfully",
            data: result.rows[0],
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            message: "Product ID is required for deletion",
            success: false
        });
    }

    try {
        const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Product not found",
                success: false
            });
        }

        console.log("Product deleted", result.rows[0]);
        res.status(200).json({
            message: "Product deleted successfully",
            data: result.rows[0],
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

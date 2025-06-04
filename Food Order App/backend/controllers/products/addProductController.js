import db from '../../utils/db.js'

import cloudinary from 'cloudinary';

export const create = async (req, res) => {
  const { name, price, cartegory, description, imageUrl } = req.body;

  try {
    let finalImageUrl = null;

    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'FoodApp',
      });
      finalImageUrl = result.secure_url;
    } else if (imageUrl) {
      finalImageUrl = imageUrl;
    }



    const product = await db.query(
      `INSERT INTO product (name, price, cartegory, description, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, price, cartegory, description, finalImageUrl]
    );

    const newProduct = product.rows[0];

    res.status(201).json({
      status: "success",
      message: "Successfully created a product",
      data: newProduct,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to create a new product",
    });
  }
};


/* get all single product */

export const singleProduct = async (req,res) => {
    const {product_id} = req.params
    try {
        const product = await db.query(
            `SELECT * FROM product WHERE product_id =$1`,
            [product_id]
        )

        const newProduct = product.rows[0]
        res.status(200).json({
            status:"success",
            message:"Successful retrieved all product",
            data:newProduct
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status:"success",
            message:"failed to get a product",

        })
    }
}

export const allProduct = async (req,res) => {
   
    try {
        const product = await db.query(
            `SELECT * FROM product `
            
        )

        const newProduct = product.rows
        res.status(200).json({
            status:"success",
            message:"Successful retrieved all product",
            data:newProduct
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status:"success",
            message:"failed to get a product",

        })
    }
}

/* Add to cart */

export const addToCart = async (req,res) => {
  const {user_id,product_id,quantity} = req.body
  try {
    const cartItem = await db.query(
      `INSERT INTO cart  (user_id, product_id, quantity) VALUES ($1,$2,$3) RETURNING *`,
      [user_id, product_id,quantity || 1]
    )
    res.status(201).json({
      status: "success",
      message: "Product added to cart",
      data: cartItem.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to add product to cart",
    });
  }

  
}

/* get cartItem by user */

export const getCart = async (req,res) => {
  const { user_id} = req.params
  try {
    const cartItems = await db.query(
      `SELECT c.cart_id, c.quantity, p.name, p.price, p.image_url
      FROM cart c
      JOIN product p ON c.product_id = p.product_id
      WHERE c.user_id = $1`,
      [user_id]
    )

    res.status(200).json({
      status: "success",
      data: cartItems.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to get cart items",
    });
  }
}


//update quantity in cart

export const updateQuantity = async (req, res) => {
  const { user_id, product_id, quantity} = req.body;
  try {
    const result = await db.query(
      `UPDATE cart SET quantity = $1 WHERE user_id = $2 AND product_id = $3 RETURNING *`,
      [quantity, user_id,product_id]
    )

    if (result.rows.length ===0 ) {
      return res.status(404).json({
        status: "error",
        message: "Cart item not found",
      });
    }
    res.status(200).json({
      status:"success",
      message: "Cart item updated successfully",
      data: result.rows[0],
    })
      
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to update cart item",
    });
  }
}
import db from '../../utils/db.js';

/* ✅ Create Order */
export const order = async (req, res) => {
  const { name = '', product, amount, user_id, status } = req.body;

  // Input validation
  if (!product || !amount || !user_id) {
    return res.status(400).json({
      status: "false",
      message: "Missing required fields: product, amount, or user_id"
    });
  }

  const validStatus = ['pending', 'processing', 'delivery'];
  const orderStatus = validStatus.includes(status) ? status : 'pending';

  try {
    const createOrder = await db.query(
      `INSERT INTO orders (name, product, amount, user_id, status)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, product, parseFloat(amount), parseInt(user_id), orderStatus]
    );

    res.status(201).json({
      status: "success",
      message: "Order created successfully",
      data: createOrder.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "false",
      message: "Failed to create order"
    });
  }
};

/* ✅ Get Order by ID */
export const getOrder = async (req, res) => {
  const { order_id } = req.params;

  try {
    const getOrder = await db.query(
      `SELECT * FROM orders WHERE order_id = $1`,
      [order_id]
    );

    const order = getOrder.rows[0];

    if (!order) {
      return res.status(404).json({
        status: "false",
        message: "Order not found"
      });
    }

    res.status(200).json({
      status: "success",
      message: "Successfully retrieved order",
      data: order
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "false",
      message: "Failed to get order"
    });
  }
};

/* ✅ Get All Orders */
export const getAllOrder = async (req, res) => {
  try {
    const getOrder = await db.query(`SELECT * FROM orders`);
    res.status(200).json({
      status: "success",
      message: "Successfully retrieved all orders",
      data: getOrder.rows
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "false",
      message: "Failed to get orders"
    });
  }
};

/* ✅ Delete Order */
export const deleteOrder = async (req, res) => {
  const { order_id } = req.params;

  try {
    const deleteOrder = await db.query(
      `DELETE FROM orders WHERE order_id = $1 RETURNING *`,
      [order_id]
    );

    res.status(200).json({
      status: "success",
      message: "Successfully deleted order",
      data: deleteOrder.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "false",
      message: "Failed to delete order"
    });
  }
};

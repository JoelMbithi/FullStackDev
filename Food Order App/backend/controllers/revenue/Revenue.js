import db from '../../utils/db.js'

/* Create Revenue */
export const revenue = async (req, res) => {
  const { name, product, amount, user_id, restaurant_id, status,transaction_id } = req.body;

  try {
    const createRevenue = await db.query(
      `INSERT INTO revenue (name, product, amount, user_id, restaurant_id, status,transaction_id)
       VALUES ($1, $2, $3, $4, $5, $6,$7)
       RETURNING *`,
      [name, product, parseFloat(amount), parseInt(user_id), parseInt(restaurant_id),transaction_id, status || 'pending']
    );

    res.status(201).json({
      status: "success",
      message: "Successfully created revenue",
      data: createRevenue.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "false",
      message: "Failed to create a revenue"
    });
  }
};

/* get all revenue*/

export const getAllRevenue = async (req, res) => {
    try {
      const revenue = await db.query(`SELECT * FROM revenue`);
  
      res.status(200).json({
        status: "success",
        message: "Successfully retrieved all transactions",
        data: revenue.rows
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "false",
        message: "Failed to retrieve all revenue"
      });
    }
  };

  
/* get single revenue */

export const getSingleRevenue = async (req, res) => {
    const { revenue_id } = req.params;
  
    try {
      const result = await db.query(
        `SELECT * FROM revenue WHERE revenue_id = $1`,
        [revenue_id]
      );
  
      const revenue = result.rows[0];
  
      res.status(200).json({
        status: "success",
        message: "Successfully retrieved transaction",
        data: revenue
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "false",
        message: "Failed to retrieve revenue"
      });
    }
  };
  
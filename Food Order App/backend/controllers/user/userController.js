
import db from '../../utils/db.js'


/* get user */

export const getAllUSer = async(req,res) =>{
    const {user_id} = req.params
    try {
        const user = await db.query(
            `SELECT * FROM client       `
        )

        const allUser = user.rows

        res.status(200).json({
            status:"success",
            message:"Successful retrived all users",
            data:allUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
}

/* get a user */

export const singleUser = async (req, res) => {
    const { user_id } = req.params;
  
    try {
      const result = await db.query(
        `SELECT * FROM client WHERE user_id = $1`,
        [user_id]
      );
  
      if (result.rows.length === 0) {
        return res.status(404).json({
          status: "fail",
          message: "User not found",
        });
      }
  
      const user = result.rows[0];
  
      res.status(200).json({
        status: "success",
        message: "Successfully retrieved user information",
        data: {
          name: user.name,
          role: user.role,
          email: user.email,
          phone: user.phone,
          image: user.image,
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

  /* update user */


  export const updateClient = async (req,res) => {
    const {name,email,phone,image,country,role} = req.body
    const {user_id} = req.params
    try {
      const updateClient = await db.query(
        `UPDATE client SET name =$1, email =$2,phone =$3,image =$4,country =$5,role  =$6  WHERE user_id = $7 RETURNING *`,
        [name,email,phone,image,country,role,user_id]

      )
      const updatedClient = updateClient.rows[0]
      res.status(201).json({
        status:"success",
        message:"Successful update user",
        data:updatedClient
      })
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }


  /* delete client */

  export const deleteClient = async (req, res) => {
    const { user_id } = req.params;
    try {
      const deleteClient = await db.query(
        `DELETE FROM client WHERE user_id = $1 RETURNING *`,
        [user_id]
      );
  
      const deletedClient = deleteClient.rows[0];
  
      if (!deletedClient) {
        return res.status(404).json({
          status: "error",
          message: "Client not found",
        });
      }
  
      res.status(200).json({
        status: "success",
        message: "Successfully deleted client",
        data: deletedClient,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
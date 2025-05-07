
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
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

  /* update user */
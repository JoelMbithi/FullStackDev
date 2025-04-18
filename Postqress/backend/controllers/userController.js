import db from '../utils/db.js'

export const createUser = async (req, res) => {
  const { name, email,job,rate,isActive } = req.body; // Extract data from request body

  if (!name || !email ) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Insert the user into the PostgreSQL database
    const result = await db.query(
      'INSERT INTO clients(name, email, job, rate, isActive) VALUES ($1, $2, $3,$4,$5) RETURNING *',
      [name, email, job,rate,isActive]
    );

    // Respond with the created user data
    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create user', error });
  }
};


//get All clients
export const getClients = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM clients ORDER BY id ASC');

    res.status(200).json({
      message: "All Clients",
      data: result.rows,
      success: true
    });

  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ message: 'Failed to fetch clients', error });
  }
};


//Delete

export const UpdateClient = async (req, res) => {

  const{name,email,job,rate,isActive} = req.body
  const { id } = req.params

  try {
    
    const updateClient = await db.query(`UPDATE clients SET name=$1, email=$2 ,job=$3 ,rate=$4 ,isActive=$5 ,id=$6 
      WHERE id=$6
      RETURNING *
      `  ,
    
      [name, email, job , rate, isActive , id])

      res.status(200).json({
        message: "Successfully Updated Client",
      data: updateClient.rows[0],
      success: true
      })


  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ message: 'Failed to fetch clients', error

    })
  }
}


export const deleteClient = async (req,res) => {
 /*  const {name,email,job , rate,isActive} = res.body; */
  const { id } = req.params
  try {
    
    const deleteClient = await db.query( 
      `DELETE FROM clients WHERE id = $1 RETURNING *`,
      [id]
    )
    
    res.status(200).json({
      message: "Successfully deleted Client",
    data: deleteClient.rows[0],
    success: true
    })
  } catch (error) {
    console.error("Error fetching clients:", error)
    res.status(500).json({ message: 'Failed to fetch clients', error
    })

  }
}
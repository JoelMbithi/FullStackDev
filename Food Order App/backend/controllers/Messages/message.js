import db from "../../utils/db.js"

export const createMessage = async (req, res) => {
    const {name,email, subject,message} = req.body;

    if(!name || !email || !subject || !message) {
        return res.status(400).json({error: "All fields are required"});
    }
    // Here you would typically save the message to a database or send it via email
    
    try {
        const newMessage = await db.query(
            `INSERT INTO messages (name,email, subject, message) VALUES ($1, $2, $3, $4) RETURNING *`,
            [name, email, subject, message]
        )

        res.status(200).json({
            status: "success",
            message: "Message created successfully",
            data:newMessage.rows[0],
        })
    } catch (error) {
        console.error("Error creating message:", error);
        res.status(500).json({ error: "Internal server error" });
        
    }
}


//get all messages

export const getAllMessages = async (req,res) => {

    try {
        const messages = await db.query(
            `SELECT * FROM messages ORDER BY created_at DESC`

        )
        res.status(200).json({
            status:"success",
            message: "Messages fetched successfully",
            data: messages.rows
        })
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ error: "Internal server error" });
        
    }
}

//delete message
export const deleteMessage = async (req,res) => {
    const {message_id} = req.params;
    if(!message_id) {
        return res.status(400).json({error: "Message ID is required"});
    }
    try {
        const deleteMessage = await db.query(
            `DELETE FROM messages WHERE id = $1 RETURNING *`
            , [message_id]
        )

        if(deleteMessage.rowCount === 0) {
            return res.status(404).json({error: "Message not found"})

        }

        res.status(200).json({
            status:"success",
            message: "Message deleted successfully",
            data: deleteMessage.rows[0] 
        })
    } catch (error) {
        console.error("Error deleting message:", error);
        res.status(500).json({ error: "Internal server error" });
        
    }
}


/* News Subscription */

export const subscribeToNewsletter = async (req, res) => {
    const {email} = req.body
   
    if(!email){
        return res.status(400).json({error: "Email is required"});
    }
        
    try {
            const newSubsriber = await db.query(
                `INSERT INTO newsletter_subscribers (email) VALUES ($1) RETURNING *`,
                [email] 
            )

            res.status(200).json({
                status:"success",
                message:"Subscribed to newsletter successfully",
                data: newSubsriber.rows[0],
            })
        } catch (error) {
            console.log("Error subscribing to newsletter:", error);
            return res.status(500).json({ error: "Internal server error" });    
        }
    
}
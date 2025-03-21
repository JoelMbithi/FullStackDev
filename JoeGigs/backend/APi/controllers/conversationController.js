import Conversation from "../Models/conversationModel.js"


export const createConversations = async (req, res) => {
    try {
        const { to } = req.body;

        // Prevent user from starting a conversation with themselves
        if (req.userId === to) {
            return res.status(400).json({ error: "Buyer and seller must be different users." });
        }

        const conversationId = req.isSeller 
            ? `${req.userId}_${to}` 
            : `${to}_${req.userId}`;

        // Check if conversation already exists
        const existingConversation = await Conversation.findOne({ id: conversationId });
        if (existingConversation) {
            return res.status(200).json(existingConversation);
        }

        const newConversation = new Conversation({
            id: conversationId,
            sellerId: req.isSeller ? req.userId : to,
            buyerId: req.isSeller ? to : req.userId,  
            readBySeller: req.isSeller,
            readByBuyer: !req.isSeller,
        });

        const savedConversation = await newConversation.save();
        res.status(201).json(savedConversation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



//Update conversation

export const updateConversations = async(req,res)=> {
    try {
        const updatedConversation = await Conversation.findOneAndUpdate({
            id: req.params.id},
        {
            $set: {
                //readBySeller:true,
                // readByBuyer: true,

                ...(req.isSeller ? {readBySeller: true} : { readByBuyer : true})
            }
        },
        //to show the updated conversations
      {  new:true}
    )

    res.status(200).json(updatedConversation)
    } catch (error) {
        res.status(500).json(error)
    }
}



//get single message

export const getSingleConversations = async (req,res) => {
    try {
        const conversation = await findOne({id: req.params.id})

        res.status(200).json(conversation)
    } catch (error) {
        res.status(500).json(error)
    }
}

//get All conversations

export const getConversations = async (req,res) => {
    try {
        const conversations = await Conversation.find(
            req.isSeller ? { sellerId: req.userId} : { buyerId: req.userId}
        )
    
        res.status(200).json(conversations)
    } catch (error) {
        res.status(500).json(error)
    }
}
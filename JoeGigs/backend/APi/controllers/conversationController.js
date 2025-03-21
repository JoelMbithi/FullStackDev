import Conversation from "../Models/conversation.model.js"


export const createConversations = async (req, res) => {
    try {
        const newConversation = new Conversation({
            id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
            sellerId: req.isSeller ? req.userId : req.body.to,
            buyerId: req.isSeller ? req.body.to : req.userId,  
            readBySeller: req.isSeller,
            readByBuyer: !req.isSeller,
        });

        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (error) {
        res.status(500).json(error);
    }
};


//Update conversation

export const updateConversations = async(req,res)=> {
    try {
        const updatedConversation = await Conversation.findOneAndUpdate({
            id: req.params.is},
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

    res.status(200).json(updateConversations)
    } catch (error) {
        res.status(500).json(error)
    }
}



//get single message

export const getSingleConversations = async (req,res) => {
    try {
        const conversation = await findOne({id: id.params.id})

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
import Order from "../Models/orderModel.js"
import Gig from "../Models/gigModel.js"

export const createOrder = async (req,res) => {

    //fetch gig id from Gig model
     const gig = await Gig.findById(req.params.gigId)


    try {
        
        const newOrder = new Order({
            gigId:gig._id,
            img:gig.cover,
            title:gig.title,
            buyerId:req.userId,
            sellerId: gig.userId,
            price:gig.price,
            payment_intent:"temporary"
        })
        const savedOrder = await newOrder.save()
        res.status(200).send("successful")

    } catch (error) {
        res.status(500).json(error)
    }
}


//get Order

export const getOrder = async (req,res) => {

    try {
        const orders = await Order.find({
            ...(req.isSeller ? 
                { sellerId: req.userId} 
                : { buyerId: req.userId}),
                isCompleted: true,
            
        })
        res.status(200).json(orders)
        
    } catch (error) {
        res.status(500).json(error)
    }

}
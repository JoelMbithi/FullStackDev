
import Gig from "../Models/gigModel.js"
//Creating new Gig
export const createGig = async (req,res) => {

    //confirm if its Seller
    if(!req.isSeller)
        return res.status(500).send("Only Sellers can Create  Gig")

    const newGig = new Gig({
        userId: req.userId,
        ...req.body,

    })

    try {

        const savedGig = await newGig.save()
        res.status(200).json(savedGig)
        
    } catch (error) {
        res.status(500).send("Unable to create a new gig")
    }
    

}

//delete the Gig

export const deleteGig = async (req,res) => {
    try {
      
        const gig = await Gig.findById(req.params.id)

        if(gig.userId !== req.userId)
            return res.status(400).send("You can only delete your Gig only")

        await Gig.findByIdAndDelete(req.params.id)
        res.status(200).send("Gig has been deleted")

    } catch (error) {
        res.status(500).json(error)
    }
}

//Get a Gig

export const getGig = async (req,res) => {
    try {
        
        const gig = await Gig.findById(req.params.id)
        res.status(200).json(gig)

    } catch (error) {
        res.status(500).json(error)
    }
}

//get gigs

export const getGigs = async (req,res) => {

    const q = req.query;
    const filters = {
    ...(q.userId && { userId: q.userId}),
   ...(q.category && { category: q.category }),
   ...((q.min || q.max) && { price: { ...(q.min && { $gt: q.min }), ...(q.max && { $lt: q.max }) } }),
   ...(q.search && { title: { $regex: q.search, $options: "i" } })
};

    try {

        const gig = await Gig.find(filters)
        res.status(200).json(gig)
        
    } catch (error) {
        res.status(500).json(error)
    }
}
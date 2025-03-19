
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
export const getGig = async (req, res) => {
    try {
      const gig = await Gig.findById(req.params.id);
      if (!gig) return res.status(404).json({ message: "Gig not found" });
  
      res.status(200).json(gig);
    } catch (error) {
      res.status(500).json({ message: "Error fetching gig", error });
    }
  };
  
//get gigs
export const getGigs = async (req, res) => {
     // Extract query parameters from the request URL
    const q = req.query;

    const filters = {
         // Filter by userId if provided
        ...(q.userId && { userId: q.userId }),
        ...(q.category && { category: q.category }), // Filter by category if provided
        ...((q.min || q.max) && { // Price filtering if min or max is provided
            price: { 
                ...(q.min && { $gt: q.min }), // If min price is provided, use $gt (greater than)
                ...(q.max && { $lt: q.max })  // If max price is provided, use $lt (less than)
            } 
        }),
        ...(q.search && { title: { $regex: q.search, $options: "i" } }) // Search by title using regex (case-insensitive)
    };

    try {
    const gigs = await Gig.find(filters).sort({ [q.sort]:-1}); // Query MongoDB with the filters
        res.status(200).json(gigs); // Send the result as a JSON response
    } catch (error) {
        res.status(500).json(error); // Handle errors
    }
};

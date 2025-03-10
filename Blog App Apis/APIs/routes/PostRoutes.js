import express from "express";
import Post from "../models/PostModel.js"

const router = express.Router();

router.post("/createPost", async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      description: req.body.description,
      photos: req.body.photos, 
      username: req.body.username,
      category: req.body.category,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost); // Use 201 for resource creation

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Update Post

router.put("/updatePost/:id",async(req,res)=>{
    try {
        
        const post = await Post.findById(req.params.id)
        if(post.username === req.body.username) {

            if(!post){
                return res.status(404).json("post not found")
            }

            const updatedPost = await Post.findByIdAndUpdate(req.params.id,
                {$set: req.body},
                {new:true}
            )

            res.status(200).json(updatedPost)
           
        }else {
            res.status(401).json("You can only update your post")
        }

    } catch (error) {
        res.status(500).json(error)
    }
})


//Delete a Post

router.delete("/deletePost/:id", async(req,res)=>{
    try {

        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json("Post not found")
        }
      
        if( post.username === req.body.username){
        const post = await Post.findById(req.params.id)
       
   
        await post.deleteOne()
        res.status(200).json("Post has been deleted")

    }else{
        res.status(500).json("You can only delete your post")
    }

        
    } catch (error) {
        res.status(500).json(error)
    }
})
//get post

router.get("/getPost/:id", async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)

        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})

export default router;

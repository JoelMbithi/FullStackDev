import React from "react";
import "./Reviews.scss";
import Review from "../review/Review";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";


const Reviews = ({ gigId }) => {

  const queryClient =  useQueryClient()

  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews", gigId],
    queryFn: async () => {
      if (!gigId) throw new Error("gigId is missing");
      const res = await newRequest.get(`/review/getReview/${gigId}`);
      return res.data;
    },
  });

  console.log("Fetched reviews:", data);

  const mutation = useMutation({
    mutationFn: (review) => {
      return  newRequest.post("/review/createReview",review)
    },
    onSuccess:()=>{
      queryClient.invalidateQueries(["reviews"])
    }
  })

  //Function to handle the post add and post form
  const handleSubmit = (e) => {
    e.preventDefault()
     const desc = e.target[0].value;
     const star = e.target[1].value;
     mutation.mutate({gigId,desc,star})
  }


  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading ? (
        "Loading..."
      ) : error ? (
        <p style={{ color: "red" }}>Error fetching reviews: {error.message}</p>
      ) : data.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        data.map((review) => <Review key={review._id} review={review} />)

       
      )}
       <div className="add">
          <form action="" onSubmit={handleSubmit}>
            <input type="text" placeholder="write your opinion" />
            <select name="" id="">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            </select>
            <button>send</button>
          </form>
          </div>
    </div>
  );
};

export default Reviews;

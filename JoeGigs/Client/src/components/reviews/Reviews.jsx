import React from 'react'
import "./Reviews.scss"
import Review from '../review /Review'
import { useQuery } from '@tanstack/react-query'


const Reviews = ({gigId}) => {

  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      newRequest.get(`/reviews/getReview/${id}`).then((res) => res.data),
  });

  return (


      <div className="reviews">
            <h2>Reviews</h2>
            {isLoading ? "loading"
            : error ? "Something went Wrong!"
          : data.map((review) => <Review key={review._id} review={review} />)
           }
            
        
          </div>
   
  )
}

export default Reviews

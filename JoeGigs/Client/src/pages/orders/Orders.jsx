
import React from 'react'
import"./Orders.scss"
import {Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'
import message from "../../assets/message.png"


const Orders = () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const navigate = useNavigate()
 
   const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () => {

      return newRequest.get(`/orders`).then((res) => res.data);
    },
  
  });

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const res = await newRequest.get(`/conversation/singleConversation/${id}`)
      navigate(`/message/$(res.data.id)`)
    } catch (error) {
      if(error.response.status === 404) {
        
        const res = await newRequest.post(`/conversation/`,{
          
          to: currentUser.seller ? buyerId : sellerId,
        });
        navigate(`/message/$(res.data.id)`)
      }
      
    }

  }

  return (
    <div className='orders'>
     { isLoading ? "loading" 
     : error ? "something went wrong!"
     : <div className="container">
        <div className="title">
          <h1>Orders</h1>
         
        </div>

        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            
            <th>Action</th>
          </tr>
          
          {
            data.map((order) => (
            <tr key={order._id}>
            <td>
           <img className='image' src={order.img} alt="" /> 
            </td>
            <td>{order.title}</td>
            <td>
              {order.price}
            </td>

           <td> <img className='delete' src={message} alt="" onClick={()=>handleContact(order)}/></td>
         
          </tr>
              )) }
          
        </table>
      </div>}
    </div>
  )
}

export default Orders
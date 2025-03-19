import React from 'react'
import"./Orders.scss"
import {Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'
import message from "../../assets/message.png"


const Orders = () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

 
   const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () => {

      return newRequest.get(`/orders`).then((res) => res.data);
    },
  
  });
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

           <td> <img className='delete' src={message} alt="" /></td>
         
          </tr>
              )) }
          
        </table>
      </div>}
    </div>
  )
}

export default Orders
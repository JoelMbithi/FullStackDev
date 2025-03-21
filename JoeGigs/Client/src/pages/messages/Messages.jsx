import React from "react";
import "./Messages.scss";
import { Link } from "react-router-dom";
import { useQuery }  from "@tanstack/react-query"
import newRequest from "../../utils/newRequest"
import moment from "moment";



const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  const {isLoading,error,data} = useQuery({
    queryKey: ["conversation"],
    queryFn: () => 
      newRequest.get( `/conversation`)
    .then((res) => {
      return res.data
    })
  })

  const messageText = "Welcome to your messages! Stay connected and manage your conversations easily.";

  return (
    <div className="messages">
      {isLoading ? "loading "
      : error ? "Something went wromg"
      : <div className="container">
        <div className="title">
          <h1>Messages</h1>
        </div>

        <table>
        
            <tr>
              <th>Buyer</th>
              <th>Last Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          
          { data.map((conversation)=>(
            <tr className="active" key={conversation.id}>
              <td>{currentUser.isSeller ? conversation.buyerId : conversation.sellerId}</td>
              <td> <Link className="link" to="/message/1234">{conversation ?. lastMessage ?.substring(0, 50)}...</Link></td> 
              <td>{moment(conversation.updateAt).fromNow()}</td>
              <td>
                {(currentUser.isSeller && !conversation.readBySeller) ||
                (!currentUser.isSeller && !conversation.readByBuyer &&
                  ( <button>Mark as read</button>)
                )}
               
              </td>
            </tr>
            ))}
          
          
        </table>
      </div>}
    </div>
  );
};

export default Messages;

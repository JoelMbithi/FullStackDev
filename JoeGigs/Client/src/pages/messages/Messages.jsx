import React from "react";
import "./Messages.scss";
import { Link } from "react-router-dom";

const Messages = () => {
  const currentUser = {
    id: 1,
    username: "Edwin Mukongwe",
    isSeller: true,
  };

  const messageText = "Welcome to your messages! Stay connected and manage your conversations easily.";

  return (
    <div className="messages">
      <div className="container">
        <div className="title">
          <h1>Messages</h1>
        </div>

        <table>
          <thead>
            <tr>
              <th>Buyer</th>
              <th>Last Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="active">
              <td>Joe Mbithi</td>
              <td> <Link className="link" to="/message/1234">{messageText.substring(0, 50)}...</Link></td> 
              <td>1 day ago</td>
              <td>
                <button>Mark as read</button>
              </td>
            </tr>

            <tr className="active">
              <td>Edwin Mukongwe</td>
              <td> <Link className="link" to="/message/1234">{messageText.substring(0, 50)}...</Link></td> 
              <td>2 days ago</td>
              <td>
                <button>Mark as read</button>
              </td>
            </tr>

            <tr>
              <td>John Doe</td>
              <td> <Link className="link" to="/message/1234">{messageText.substring(0, 50)}...</Link></td> 
              <td>3 days ago</td>
              
            </tr>

            <tr>
              <td>Jane Smith</td>
              <td> <Link className="link" to="/message/1234">{messageText.substring(0, 50)}...</Link></td> 
              <td>4 days ago</td>
              
            </tr>

            <tr>
              <td>Michael Johnson</td>
              <td> <Link className="link" to="/message/1234">{messageText.substring(0, 50)}...</Link></td> 
              <td>5 days ago</td>
             
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Messages;

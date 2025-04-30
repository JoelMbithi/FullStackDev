import React, { useEffect, useState } from "react";
import { FiUsers, FiHome, FiSettings, FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";

import axios from "axios";

const UserManagement = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [count, setCount] = useState(0);
  const [apartments, setApartments] = useState(null);

  const [apartmentCount, setApartmentCount] = useState(0);
  const [bookCount, setBookCount] = useState(0);
  const [books, setBooks] = useState(null);
  const [book, setBook] = useState([]);

  const fetchUser = async () => {
    const id = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`http://localhost:3000/api/user/getUsers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data.data);
      setUsers(res.data.data);
      setCount(res.data.count);

      /* get A single user */
      const response = await axios.get(`http://localhost:3000/api/user/getUser/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data.data)
      setUser(response.data.data)
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBooking = async () => {
    const id = localStorage.getItem("bookId");
    const token = localStorage.getItem("token");

    try {
      if (!id) {
        console.error("Booking ID is undefined. Cannot fetch booking.");
        return;
      }
      const res = await axios.get(
        `http://localhost:3000/api/booking/getAllBooking`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      setBook(res.data.data.rows);
      const bookings = res.data.data.rows;
      setBook(bookings);
      setBookCount(bookings.length);

      /* Fetching single Booking */
      const response = await axios.get(
        `http://localhost:3000/api/booking/getBooking/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      console.log(response.data.booking);
      setBook(response.data.booking);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchApartments = async () => {
    const id = localStorage.getItem("bookId");
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`http://localhost:3000/api/apartment/get`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log(res.data.apartments);
      setApartments(res.data.apartments);
      setApartmentCount(res.data.apartments.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApartments();
    fetchUser();
    fetchBooking();
  }, []);

  const handleClose = ()=> {

  }

  return (
    <div className="flex h-grow bg-gray-100">
      {/* Left sidebar */}
      <div className="bg-blue-950 text-white flex flex-col justify-evenly h-screen w-30">
        <div className="flex flex-col gap-4 items-center justify-center">
          <div className="w-20 h-20  mt-20 bg-slate-300 p-2 rounded-full flex items-center justify-center"></div>
          <h1 className="text-center">User</h1>
        </div>

        <div className="flex flex-col items-center ">
          <div className="text-white text-lg p-4 flex flex-col gap-2 h-full">
            {/* Logo/Header (optional) */}

            {/* Navigation Links */}
            <nav className="flex flex-col gap-1 flex-grow">
              <Link
                to="/admin"
                className="flex items-center px-3 py-3 hover:w-30 rounded-2xl hover:bg-slate-700 transition-all duration-200 group"
              >
                <FiHome className="mr-3 text-xl hover:ml-30 opacity-80 group-hover:opacity-100" />
                <span className="group-hover:translate-x-1 transition-transform"></span>
              </Link>

              <Link
                to="/users"
                className="flex items-center px-3 py-3  hover:w-30 rounded-2xl hover:bg-slate-700 transition-all duration-200 group"
              >
                <FiUsers className="mr-3 text-xl opacity-80 group-hover:opacity-100" />
              </Link>

              {/* Spacer to push settings to bottom */}
              <div className="flex-grow"></div>

              <Link
                to="/admin/settings"
                className="flex items-center px-3 py-3  hover:w-30 rounded-2xl hover:bg-slate-700 transition-all duration-200 group mt-auto"
              >
                <FiSettings className="mr-3 text-xl opacity-80 group-hover:opacity-100" />
              </Link>
            </nav>
          </div>

          <div className="p-4  border-slate-700 mt-4">
            <button
              /* onClick={handleLogout} */
              className="flex items-center w-full p-3  hover:w-30 rounded-2xl hover:bg-slate-700 transition-colors"
            >
              <FiLogOut className="mr-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Right content area */}
      <div className="flex-1  mt-10 p-8 ">
        <div className="bg-white rounded-lg shadow  p-6">
          <h1 className="text-4xl font-bold">Booking Information</h1>

          {/* Single Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {users && users.length > 0 && (
              <div className="flex flex-col p-4 rounded bg-slate-50">
                <h1 className="text-blue-600 font-bold">Total Users</h1>
                <p className="font-bold">{count}</p>
              </div>
            )}

            {book && book.length > 0 && (
              <div className="flex flex-col p-4 rounded bg-slate-50">
                <h1 className="text-purple-600 font-bold">Total Booking</h1>
                <p>{bookCount}</p>
              </div>
            )}
            <div className="flex flex-col p-4 rounded bg-slate-50">
              <h1 className="text-green-600 font-bold">Completed Booking</h1>
              <p>198</p>
            </div>
          </div>
        </div>

        {/* right section */}

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {/* User Details */}
         {user && (
           <div className="flex flex-col p-4 rounded bg-slate-50 flex-grow shadow-md">
           <h1 className="text-blue-600 font-bold mb-4">User Details</h1>

           <div className="flex flex-col rounded bg-white p-4">
             <div className="flex flex-row gap-2 mb-2">
               <label className="font-semibold">User:</label>
               <p>{user.name || "joe"}</p>
             </div>
             <div className="flex flex-row gap-2 mb-2">
               <label className="font-semibold">Email:</label>
               <p>{user.email ||"joellembithi@gmail.com"}</p>
             </div>
             <div className="flex flex-row gap-2 mb-2">
               <label className="font-semibold">Phone Number:</label>
               <p>{user.phone || "0743861565"}</p>
             </div>
             <div className="flex flex-row gap-2">
               <label className="font-semibold">Location:</label>
               <p>{user.location || "Kenya"}</p>
             </div>
           </div>
         </div>
         )}

          {/* Room Information */}
          {book && (
            <div className="flex flex-col p-4 rounded bg-slate-50 flex-grow shadow-md">
              <h1 className="text-blue-600 font-bold mb-4">Room Details</h1>

              <div className="flex flex-col rounded bg-white p-4">
                <div className="flex flex-row gap-2 mb-2">
                  <label className="font-semibold">Room Number:</label>
                  <p>{book.room_number}</p>
                </div>
                <div className="flex flex-row gap-2 mb-2">
                  <label className="font-semibold">Room Name:</label>
                  <p>{book.type}</p>
                </div>
                <div className="flex flex-row gap-2 mb-2">
                  <label className="font-semibold">Occupant Name:</label>
                  <p>{book.occupant}</p>
                </div>
                <div className="flex flex-row gap-2">
                  <label className="font-semibold">Location:</label>
                  <p>{book.location}</p>
                </div>
                <div className="flex flex-row gap-2 mb-2">
                  <label className="font-semibold">Price:</label>
                  <p>$ {book.price || "2638600"}</p>
                </div>
                
                {/* buttons */}
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row items-center mt-5 justify-center gap-2 mb-2">
                    <button className="bg-red-700 mt-5 p-2 rounded text-white hover:bg-red-800 " onClick={()=> handleClose}>
                      Cancel Booking
                    </button>
                  </div>
                  <div className="flex flex-row items-center mt-5 justify-center gap-2 mb-2">
                    <button className="bg-blue-700 mt-5 p-2 rounded text-white hover:bg-blue-800"
                    onClick={()=> handleClose}
                    >
                      Complete Booking
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;

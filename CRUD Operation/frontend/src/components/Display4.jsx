import React, { useEffect, useState } from "react";
import axios from "axios";


const Display4 = () => {
  const [apartments,setApartments] = useState([])

  const fetchApartments = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/apartment/get`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data.apartments);
      setApartments(res.data.apartments);
      
    } catch (error) {
      console.error("Error fetching apartments:", error);
      
    }
  }

  useEffect(() => {
    fetchApartments();
  },[])
  return (
    <div className="container flex flex-col bg-slate-50 rounded mx-auto px-4 py-10">
      <div className="flex flex-col gap-3 px-10">
        <p className="font-bold text-purple-600">Come Now!</p>
        <h1 className="text-4xl text-slate-600 font-bold">Live Who You Are.</h1>
        <p className="text-slate-500">Own the home meant for you</p>
      </div>

      {apartments.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {/* The Grand Estate */}
        {apartments.map((apartment) => (
        <div  key={apartment.apartments_id}  className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
          <img
            src={apartment.image}
            alt="The Grand Estate"
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="p-4 flex flex-col gap-2">
            <h1 className="text-xl font-bold text-slate-700">{apartment.name}</h1>
            <p className="text-slate-500">{apartment.location}</p>
          <p className="text-purple-600 font-bold mt-2">${apartment.price}/month</p>
          </div>
        </div>
  ))}
      </div>
      )}
    </div>
  );
};

export default Display4;

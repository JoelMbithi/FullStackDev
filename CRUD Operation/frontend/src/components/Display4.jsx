import React, { useEffect, useState } from "react";
import axios from "axios";

const Display4 = () => {
  const [apartments, setApartments] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [room, setRoom] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [country, setCountry] = useState("");

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
  };

  useEffect(() => {
    fetchApartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log("Register data", data);

    try {
      const res = await axios.post(`http://localhost:3000/api/booking/book`, data);

      if (res.data && res.data.booking) {
        const booking = res.data.booking;
        localStorage.setItem('bookId', booking.id || '');
        localStorage.setItem('bookRoomNumber', booking.room_number || '');
        localStorage.setItem('bookOccupantName', booking.occupant || '');
        localStorage.setItem('bookStatus', booking.status || '');
        localStorage.setItem('bookType', booking.type || '');
        localStorage.setItem('bookLocation', booking.location || '');
      } else {
        console.log("res.data.booking is undefined:", res.data);
      }

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }

      console.log("Booking data", res.data.booking);
      alert(res.data.message || "Room successfully Booked");
      setPopUp(false);
      setRoom(res.data.booking);
    } catch (error) {
      console.log(error);
      alert("Failed to book the room. Please try again.");
    }
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

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
            <div
              key={apartment.apartments_id}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={apartment.image}
                alt="The Grand Estate"
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="p-4 flex flex-col gap-2">
                <div>
                  <h1 className="text-xl font-bold text-slate-700">
                    {apartment.name}
                  </h1>
                  <p className="text-slate-500">{apartment.location}</p>
                  <p className="text-purple-600 font-bold mt-2">
                    ${apartment.price}/month
                  </p>
                </div>
                <div>
                  {!popUp && (
                    <button
                      onClick={() => setPopUp(true)}
                      className="bg-slate-200 rounded shadow text-slate-700 mt-4 p-2 font-bold hover:text-purple-700"
                    >
                      Book Now
                    </button>
                  )}

                  {popUp && (
                    <div className="fixed inset-0 flex justify-center items-center z-50">
                      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
                        <h2 className="text-xl font-bold mb-4">
                          Book Apartment
                        </h2>
                        {/* form */}
                        <form onSubmit={handleSubmit}>
                          <div>
                            <label className="block font-medium mb-1">
                              Room Number:
                            </label>
                            <input
                              name="room_number"
                              type="number"
                              className="w-full p-2 border rounded"
                              required
                            />
                          </div>

                          <div>
                            <label className="block font-medium mb-1">
                              Occupant Name:
                            </label>
                            <input
                              name="occupant"
                              type="text"
                              className="w-full p-2 border rounded"
                              required
                            />
                          </div>

                          <div>
                            <label className="block font-medium mb-1">
                              Status:
                            </label>
                            <select
                              name="status"
                              id="status"
                              className="border rounded p-2 w-full"
                            >
                              <option value="">Select Status</option>
                              <option value="active">Active</option>
                              <option value="occupied">Occupied</option>
                              <option value="vacant">Vacant</option>
                              <option value="under_maintenance">
                                Under Maintenance
                              </option>
                            </select>
                          </div>
                          <div>
                            <label className="block font-medium mb-1">
                              Type:
                            </label>
                            <input
                              name="type"
                              type="text"
                              className="w-full p-2 border rounded"
                              required
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="country"
                              className="block font-medium mb-1"
                            >
                              Country
                            </label>
                            <select
                              id="country"
                              className="w-full p-2 border rounded"
                              name="location"
                              required
                              onChange={handleCountryChange}
                            >
                              <option value="">Select a country</option>
                              <option value="US">United States</option>
                              <option value="KE">Kenya</option>
                              <option value="UK">United Kingdom</option>
                              <option value="CA">Canada</option>
                              <option value="NG">Nigeria</option>
                              <option value="ZA">South Africa</option>
                              <option value="IN">India</option>
                              <option value="AU">Australia</option>
                            </select>
                          </div>

                          {country === "KE" && (
                            <div>
                              <label className="block font-medium mb-1">
                                County:
                              </label>
                              <select
                                name="county"
                                className="w-full p-2 border rounded"
                              >
                                <option value="">Select a county</option>
                                <option value="Nairobi">Nairobi</option>
                                <option value="Mombasa">Mombasa</option>
                                <option value="Kisumu">Kisumu</option>
                              </select>
                            </div>
                          )}

                          {country === "UK" && (
                            <div>
                              <label className="block font-medium mb-1">
                                Region:
                              </label>
                              <select
                                name="region"
                                className="w-full p-2 border rounded"
                              >
                                <option value="">Select a region</option>
                                <option value="England">England</option>
                                <option value="Scotland">Scotland</option>
                                <option value="Wales">Wales</option>
                              </select>
                            </div>
                          )}

                          <div className="flex justify-between">
                            <button
                              onClick={() => setPopUp(false)}
                              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                            >
                              Close
                            </button>
                            <button
                              type="submit"
                              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                            >
                              Book
                            </button>
                          </div>

                          <div className="text-center pt-4"></div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Display4;

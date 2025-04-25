import React from "react";

const Display4 = () => {
  return (
    <div className="container flex flex-col bg-slate-50 rounded mx-auto px-4 py-10">
      <div className="flex flex-col gap-3 px-10">
        <p className="font-bold text-purple-600">Come Now!</p>
        <h1 className="text-4xl text-slate-600 font-bold">Live Who You Are.</h1>
        <p className="text-slate-500">Own the home meant for you</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {/* The Grand Estate */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
          <img
            src="https://images.openai.com/thumbnails/98574a01e0e4f6b43a42fae860fc9d8f.jpeg"
            alt="The Grand Estate"
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="p-4 flex flex-col gap-2">
            <h1 className="text-xl font-bold text-slate-700">The Grand Estate</h1>
            <p className="text-slate-500">Nairobi, Kenya</p>
            <p className="text-purple-600 font-bold mt-2">$1,200/month</p>
          </div>
        </div>

        {/* Hostel Estate */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
          <img
            src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=60"
            alt="Hostel Estate"
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="p-4 flex flex-col gap-2">
            <h1 className="text-xl font-bold text-slate-700">Hostel Estate</h1>
            <p className="text-slate-500">Eldoret, Kenya</p>
            <p className="text-purple-600 font-bold mt-2">$900/month</p>
          </div>
        </div>

        {/* The Great Hotel */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
          <img
            src="https://images.mansionglobal.com/im-754382?size=1&width=1280"
            alt="The Great Hotel"
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="p-4 flex flex-col gap-2">
            <h1 className="text-xl font-bold text-slate-700">The Great Hotel</h1>
            <p className="text-slate-500">Mombasa, Kenya</p>
            <p className="text-purple-600 font-bold mt-2">$2,500/month</p>
          </div>
        </div>

        {/* Voxy Estate */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
          <img
            src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80"
            alt="Voxy Estate"
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="p-4 flex flex-col gap-2">
            <h1 className="text-xl font-bold text-slate-700">Voxy Estate</h1>
            <p className="text-slate-500">Kisumu, Kenya</p>
            <p className="text-purple-600 font-bold mt-2">$1,800/month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Display4;

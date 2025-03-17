import React, { useState, useRef, useEffect } from "react";
import "./Gigs.scss";
import dropDown from "../../assets/down.png";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";

function Gigs() {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const minRef = useRef();
  const maxRef = useRef();
  const { search } = useLocation();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs", search, min, max, sort], // Include sort in query key
    queryFn: () => {
      const queryParams = new URLSearchParams(search);
      if (min) queryParams.append("min", min);
      if (max) queryParams.append("max", max);
      queryParams.append("sort", sort);

      return newRequest.get(`/gigs/getGigs?${queryParams.toString()}`).then((res) => res.data);
    },
    enabled: false, // Disable auto-fetch, manually trigger with refetch()
  });

  useEffect(() => {
    refetch();
  }, [sort, min, max, search]); // Ensure useEffect correctly listens for changes

  // 🔥 FIX: Trigger refetch() immediately after setSort
  const reSort = (type) => {
    setSort(type);
    setOpen(false);

    // Wait for state to update before refetching
    setTimeout(() => {
      refetch();
    }, 0);
  };

  const applyFilter = () => {
    setMin(minRef.current.value);
    setMax(maxRef.current.value);
  };

  return (
    <div className="gigs">
      <div className="container">
        <span className="intro">JoeGigs {'>'} GRAPHICS & DESIGN {'>'}</span>
        <h1>AI Artist</h1>
        <p>Explore the boundaries of art and technology with JoeGig's AI artists</p>

        <div className="menu">
          <div className="leftMenu">
            <span>Budget</span>
            <input type="text" placeholder="min" ref={minRef} />
            <input type="text" placeholder="max" ref={maxRef} />
            <button onClick={applyFilter}>Apply</button>
          </div>

          <div className="rightMenu">
            <span className="sortBy">SortBy</span>
            <span className="sortType">{sort === "sales" ? "Best Selling" : "Newest"}</span>
            <img src={dropDown} alt="dropdown" onClick={() => setOpen(!open)} />
            {open && (
              <div className="dropDownMenu">
              {sort === "sales" ? (
                <span onClick={() => reSort("createdAt")}>Newest</span>
              ) : (
                <span onClick={() => reSort("sales")}>Best Selling</span>
              )}
            </div>
            )}
          </div>
        </div>

        <div className="cards">
          {isLoading
            ? "Loading..."
            : error
            ? "Something went wrong!"
            : data?.map((gig) => <GigCard key={gig._id} item={gig} />)}
        </div>
      </div>
    </div>
  );
}

export default Gigs; 
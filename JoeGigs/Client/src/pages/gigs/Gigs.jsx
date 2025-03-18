import React, { useState, useRef, useEffect } from "react";
import "./Gigs.scss";
import dropDown from "../../assets/down.png";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";

function Gigs() {
  // State variables for sorting, filtering, and dropdown menu visibility
  const [open, setOpen] = useState(false); // Controls dropdown menu visibility
  const [sort, setSort] = useState("sales"); // Default sorting by sales
  const [min, setMin] = useState(""); // Minimum price filter
  const [max, setMax] = useState(""); // Maximum price filter

  // Refs for input fields (budget min/max)
  const minRef = useRef();
  const maxRef = useRef();
  
  // Extracts query parameters from the URL (e.g., search keyword)
  const { search } = useLocation();

  // Fetch gigs based on sorting and filtering criteria
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs", search, min, max, sort], // Dependencies for caching and updates
    queryFn: () => {
      const queryParams = new URLSearchParams(search);
      if (min) queryParams.append("min", min);
      if (max) queryParams.append("max", max);
      queryParams.append("sort", sort);

      return newRequest.get(`/gigs/getGigs?${queryParams.toString()}`).then((res) => res.data);
    },
    enabled: false, // Disable auto-fetch, manual fetching with refetch()
  });

  // Trigger re-fetching when dependencies (sort, min, max, search) change
  useEffect(() => {
    refetch();
  }, [sort, min, max, search]);

  // Function to change sorting type and close dropdown
  const reSort = (type) => {
    setSort(type);
    setOpen(false);

    // Ensures state update before fetching new data
    setTimeout(() => {
      refetch();
    }, 0);
  };

  // Function to apply the min and max price filters
  const applyFilter = () => {
    setMin(minRef.current.value);
    setMax(maxRef.current.value);
  };

  return (
    <div className="gigs">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <span className="intro">JoeGigs {'>'} GRAPHICS & DESIGN {'>'}</span>
        <h1>AI Artist</h1>
        <p>Explore the boundaries of art and technology with JoeGig's AI artists</p>

        {/* Filtering and Sorting Menu */}
        <div className="menu">
          {/* Budget Filter Section */}
          <div className="leftMenu">
            <span>Budget</span>
            <input type="text" placeholder="min" ref={minRef} />
            <input type="text" placeholder="max" ref={maxRef} />
            <button onClick={applyFilter}>Apply</button>
          </div>

          {/* Sorting Dropdown Section */}
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

        {/* Display List of Gigs */}
        <div className="cards">
          {isLoading
            ? "Loading..." // Show loading message while fetching data
            : error
            ? "Something went wrong!" // Display error message if fetch fails
            : data?.map((gig) => <GigCard key={gig._id} item={gig} />)}
        </div>
      </div>
    </div>
  );
}

export default Gigs;

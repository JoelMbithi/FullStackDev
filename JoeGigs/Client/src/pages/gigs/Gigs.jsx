import React, { useState } from 'react'
import './Gigs.scss'
import dropDown from '../../assets/down.png'
import GigCard from "../../components/gigCard/GigCard"
import { gigs } from "../../data"
const Gigs = () => {

  const [open,setOpen] = useState(false)
  const [ sort, setSort] =useState("sales")

  const reSort = (type) => {
    setSort(type)
    setOpen(false)
  }


  return (
    <div className='gigs'>
      <div className="container">
        <span className="intro">
          JoeGigs {'>'} GRAPHICS & DESIGN {'>'}
        </span>
        <h1>AI Artist</h1>
        <p>Explore the boundaries of art and technology with JoeGig's AI artists</p>

        <div className="menu">
          <div className="leftMenu">
             <span>Budged</span>
             <input type="text " placeholder='min' />
             <input type="text " placeholder='max' />
             <button>Apply</button>
          </div>

          <div className="rightMenu">
            <span className="sortBy">SortBy</span>
            <span className="sortType">{sort === "sales" ? "Best Selling" : "Newest"}</span>
            <img src={dropDown} alt="" onClick={()=>setOpen( !open)}/>
            { open && (<div className="dropDownMenu">
             { sort === "sales" ?( <span onClick={()=> reSort("createAt")}>Newest</span>
             ) :( <span onClick={()=> reSort("sales")}>Best Selling</span>
             )}
            </div>
          )}
          </div>
        </div>

        <div className="cards">
          {gigs.map(gig=>{
            return <GigCard key={gig.id} item={gig}/>
          })}
        </div>
      </div>

    </div>
  )
}

export default Gigs

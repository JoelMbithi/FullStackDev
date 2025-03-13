import React from 'react'
import './Gigs.scss'
import dropDown from '../../assets/down.png'
const Gigs = () => {
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
            <span className="sortType">Best Selling</span>
            <img src={dropDown} alt="" />
            <div className="dropDownMenu">
              <span>Newest</span>
              <span>Best Selling</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Gigs

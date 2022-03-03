import React, { useState, useEffect } from 'react'
import client from '../client'
import { FaTelegramPlane, FaTwitter, FaInstagram } from "react-icons/fa";
import {Link} from 'react-router-dom'

export default function InfluencerScam() {

    const [influencer, setInfluencer] = useState([]);
    useEffect(() => {
      client.fetch(
          `*[_type=="influencers" && trappoints > 5] {
              name,
              alias,
              trappoints,
              id,
              slug,
              telegram,
              instagram,
              avgPrice,
              twitter,
              engagementRating,
              roi,
              numProjects,
              image{
                  asset -> {
                      _id,
                      url
                  },
                  alt,
              }
          }`
      ).then((data) => setInfluencer(data)).catch(console.error)
    }, []);

    const renderDev = (influencer, index) =>{
        return(
            <div className="ownerCard mb-5 col-md-3 shadow" key={index}>
                <img src={influencer.image.asset.url} alt="" />
                <p className="mb-0">{influencer.trappoints} Trap Points</p>
                <div id="dev-name">{influencer.name}</div>
                <div className="rate">Avg Price: ${influencer.avgPrice}</div>
                <div id="social-dev"><a href={influencer.telegram}><FaTelegramPlane size={25} fill={"#fff"}/></a> &nbsp;<a href={influencer.twitter}><FaTwitter size={25} fill={"#fff"}/></a>&nbsp;<a href={influencer.instagram}><FaInstagram size={25} fill={"#fff"}/></a></div>
                <br />
                <Link className="btn shadow-sm" to={{pathname:`/boobytrap/scaminfluencer/${influencer.slug.current}/${influencer.id}`, state:{id:influencer.id}}}>Details</Link>
            </div>
        )
    }
    return (
        <div className='row boobyCards mt-3' id='owner-card-cont'>
            {influencer.map(renderDev)}
        </div>
    )
}

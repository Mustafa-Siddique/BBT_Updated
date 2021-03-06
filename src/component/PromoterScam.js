import React, { useState, useEffect } from 'react'
import client from '../client'
import { FaTelegramPlane, FaTwitter, FaInstagram } from "react-icons/fa";
import {Link} from 'react-router-dom'

export default function PromoterScam() {

    const [promoter, setPromoters] = useState([]);

    useEffect(() => {
      client.fetch(
          `*[_type=="amagroups" && trappoints > 5] {
              name,
              alias,
              id,
              slug,
              trappoints,
              telegram,
              instagram,
              avgCost,
              twitter,
              engagementRating,
              groupowner,
              experience,
              tgOwner,
              admin,
              tgAdmin,
              about,
              roi,
              wallet,
              numProjects,
              groupCreated,
              image{
                  asset -> {
                      _id,
                      url
                  },
                  alt
              }
          }`
      ).then((data) => setPromoters(data)).catch(console.error)
    }, []);

    const renderDev = (promoter, index) =>{
        return(
            <div className="ownerCard mb-5 col-md-3 shadow" key={index}>
                <img src={promoter.image.asset.url} alt="" />
                <p className="mb-0">{promoter.trappoints} Trap Points</p>
                <div id="dev-name">{promoter.name}</div>
                <div className="rate">Avg Price: ${promoter.avgCost}</div>
                <div id="social-dev"><a href={promoter.telegram}><FaTelegramPlane size={25} fill={"#fff"}/></a> &nbsp;<a href={promoter.twitter}><FaTwitter size={25} fill={"#fff"}/></a>&nbsp;<a href={promoter.instagram}><FaInstagram size={25} fill={"#fff"}/></a></div>
                <br />
                <Link className="btn shadow-sm" to={{pathname:`/boobytrap/scampromoter/${promoter.slug.current}/${promoter.id}`, state:{id:promoter.id}}}>Details</Link>
            </div>
        )
    }
    return (
        <div className='row boobyCards mt-3' id='owner-card-cont'>
            {promoter.map(renderDev)}
        </div>
    )
}

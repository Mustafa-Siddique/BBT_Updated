import React, { useState, useEffect } from "react";
import client from "../client";
import {
  FaTelegramPlane,
  FaTwitter,
  FaGlobe,
  FaDiscord,
  FaInstagram,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { getTotoalProfile } from "../Web3_connection/ContractMethods";
import { initInstance } from "../Web3_connection/web3_methods";
import probably from '../images/probably.png'
import scam from '../images/scam.png'

export default function UpcomingBoobytrap() {
  const [uProject, setuProject] = useState([]);
  const [CountProfile, setProfileCount] = useState();

  /* FETCH UPCOMING PROJECTS */
  useEffect(() => {
    client
      .fetch(
        `*[_type=="uprojects" && trappoints > 5] {
              name,
              tracker,
              slug,
              contract,
              owner,
              marketingStatus,
              telegram,
              id,
              twitter,
              website,
              facebook,
              discord,
              trappoints,
              instagram,
              other,
              tgOwner,
              image{
                  asset -> {
                      _id,
                      url
                  },
                  alt
              },
              newlyLaunched,
              comStrength,
              devStatus,
              description,
          }`
      )
      .then((data) => setuProject(data))
      .catch(console.error);
    const getData = async () => {
      await initInstance();
      const data = await getTotoalProfile();
      setProfileCount(data);
    };
    getData();
  }, []);

  /* RENDER UPCOMING PROJECTS */
  const renderuProjects = (uProject, index) => {
    return (
      <div
        className="projectCard mx-2 my-4 col-md-3 px-1 py-2 pb-3 shadow"
        key={index}
        style={{backgroundColor:"#A82323", color:"#fff"}}
      >
        <div id="projectHead" className="d-flex justify-content-between">
          <div className="w-100 text-start" style={{ paddingLeft: "30px" }}>
            <h3 className="fs-6 mt-2 text-start">
              {uProject.name} <span>({uProject.tracker})</span>
            </h3>
            <a
              href={uProject.telegram}
              className="text-light"
              style={
                uProject.telegram.length > 2
                  ? { display: "inline-block" }
                  : { display: "none" }
              }
              id="project-social"
            >
              <FaTelegramPlane />
            </a>
            <a
              href={uProject.twitter}
              className="text-light"
              style={
                uProject.twitter.length > 2
                  ? { display: "inline-block" }
                  : { display: "none" }
              }
              id="project-social"
            >
              <FaTwitter />
            </a>
            <a
              href={uProject.website}
              className="text-light"
              style={
                uProject.website.length > 2
                  ? { display: "inline-block" }
                  : { display: "none" }
              }
              id="project-social"
            >
              <FaGlobe />
            </a>
            <a
              href={uProject.discord}
              className="text-light"
              style={
                uProject.discord !== null
                  ? { display: "inline-block" }
                  : { display: "none" }
              }
              id="project-social"
            >
              <FaDiscord />
            </a>
            <a
              href={uProject.insta}
              className="text-light"
              style={
                uProject.instagram !== null
                  ? { display: "inline-block" }
                  : { display: "none" }
              }
              id="project-social"
            >
              <FaInstagram />
            </a>
          </div>
          {/* RIBBON CONTAINER FOR NEWLY LAUNCHED PROJECTS */}
          <div id="bbt-ribbon-container" style={uProject.trappoints < 9 ? { display: "block" } : { display: "none" }}>
            <img src={probably} alt="" />
          </div>
          <div id="bbt-ribbon-container" style={uProject.trappoints >= 9 ? { display: "block" } : { display: "none" }}>
            <img src={scam} alt="" />
          </div>
          <img
            className="shadow bg-light"
            src={uProject.image.asset.url}
            alt=""
          />
        </div>
        <div id="projectDesc">
          <br />
          <p className="mb-0 card-bold-points">{uProject.trappoints} Trap Points</p>
          <p className="mb-0">{uProject.comStrength}k+ Community Strength</p>
          <p>{uProject.description.length > 150 ? uProject.description.slice(0,150)+"..." : uProject.description}</p>
        </div>
        <Link
          className="btn shadow-sm"
          to={{ pathname: `/boobytrap/upcomingscam/${uProject.slug.current}/${uProject.id}`, state:{id:uProject.id}}}
        >
          Details
        </Link>
      </div>
    );
  };

  return (
    <div className="row boobyCards safuCards">
      {uProject.map(renderuProjects)}
    </div>
  );
}

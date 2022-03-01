import React, { useState } from "react";
import { FaBusinessTime, FaLaptopCode, FaCode } from "react-icons/fa";
import {
  GiChart,
  GiChessKing,
  GiSandsOfTime,
} from "react-icons/gi";
import {MdDangerous} from 'react-icons/md'
import {Link} from 'react-router-dom'

export default function ScamSidebar() {

  /*Set Active Sidebar*/
    const [sidebar, setSidebar] = useState(1);

  const activeSidebar = (index) => {
    setSidebar(index);
  };

  return <div id="scamSidebar">
      <div className="side-categories p-3 rounded">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link
                  className={window.location.pathname.includes("upcomingscam") === true ? "nav-link active" : "nav-link"} to="/boobytrap/upcomingscam" onClick={() => activeSidebar(1)}
                >
                  <MdDangerous /> Upcoming Projects
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={window.location.pathname.includes("ongoingscam") === true || sidebar === 2 ? "nav-link active" : "nav-link"} to="/boobytrap/ongoingscam" onClick={() => activeSidebar(2)}
                >
                  <GiSandsOfTime /> Ongoing Projects
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={window.location.pathname.includes("ownerscam") === true ? "nav-link active" : "nav-link"} to="/boobytrap/ownerscam" onClick={() => activeSidebar(3)}
                >
                  <FaBusinessTime /> Project Owners
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={window.location.pathname.includes("developers") === true ? "nav-link active" : "nav-link"} to="/safehaven/developers" onClick={() => activeSidebar(4)}
                >
                  <FaLaptopCode /> Developers
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={window.location.pathname.includes("influencers") === true ? "nav-link active" : "nav-link"} to="/safehaven/influencers" onClick={() => activeSidebar(5)}
                >
                  <GiChessKing /> Influencers
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={window.location.pathname.includes("promoters") === true ? "nav-link active" : "nav-link"} to="/safehaven/promoters" onClick={() => activeSidebar(6)}
                >
                  <GiChart /> AMA/Call Channels
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={window.location.pathname.includes("influencers") === true ? "nav-link active" : "nav-link"} to="/safehaven/promoters" onClick={() => activeSidebar(7)}
                >
                  <FaCode /> Other Services
                </Link>
              </li>
            </ul>
          </div>
  </div>;
}

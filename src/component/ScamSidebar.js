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
                  className={window.location.pathname.includes("scamowner") === true ? "nav-link active" : "nav-link"} to="/boobytrap/scamowner" onClick={() => activeSidebar(3)}
                >
                  <FaBusinessTime /> Project Owners
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={window.location.pathname.includes("scamdev") === true ? "nav-link active" : "nav-link"} to="/boobytrap/scamdev" onClick={() => activeSidebar(4)}
                >
                  <FaLaptopCode /> Developers
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={window.location.pathname.includes("scaminfluencer") === true ? "nav-link active" : "nav-link"} to="/boobytrap/scaminfluencer" onClick={() => activeSidebar(5)}
                >
                  <GiChessKing /> Influencers
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={window.location.pathname.includes("scampromoter") === true ? "nav-link active" : "nav-link"} to="/boobytrap/scampromoter" onClick={() => activeSidebar(6)}
                >
                  <GiChart /> AMA/Call Channels
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={window.location.pathname.includes("scaminfluencer") === true ? "nav-link active" : "nav-link"} to="/boobytrap/scaminfluencer" onClick={() => activeSidebar(7)}
                >
                  <FaCode /> Other Services
                </Link>
              </li>
            </ul>
          </div>
  </div>;
}

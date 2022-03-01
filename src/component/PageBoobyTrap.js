import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {
  AiFillLeftCircle,
} from "react-icons/ai";
import { Link, Outlet } from "react-router-dom";
import ScamSidebar from "./ScamSidebar";

export default function PageBoobyTrap() {

  const toggleSort = (e) => {
    const checked = e.target.checked;
    if (checked) {
    //  checked
    console.log("Checked")
    } else {
    console.log("unhecked")
    //  unchecked
    }
  };

  return (
    <div id="pagesafe-cont">
      <div style={{backgroundColor:"#a82323"}} className="safe-head py-3 position-relative container-fluid">
        <div className="head-content">
          <Breadcrumb>
            <AiFillLeftCircle size={25} color="#fff" />
            <Breadcrumb.Item href="/">&nbsp; Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Booby Trap</Breadcrumb.Item>
          </Breadcrumb>
          <h1>BOOBY TRAP</h1>
          <h2>Shoutout against scammers &amp; fraudsters</h2>
          <b>(Platform Preview)</b>
          <p>
            0 Trap Points means the safest! lower trap points means safer! Read
            more about{" "}
            <Link
              to="/"
              style={{ color: "#fff", fontSize: "16px", fontWeight: "500" }}
            >
              trap points
            </Link>
          </p>
        </div>
      </div>
      <div className="safe-content row w-100 mt-3">
        <div className={`sidebar col-lg-3`}>
          <ScamSidebar/>
        </div>
        <div className="content col position-relative">
          <div className="d-flex justify-content-end px-5 safepage-listing">
          <button
            className="btn bg-danger button-blue"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Report Projects
          </button>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

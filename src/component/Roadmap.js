import React,{useState} from 'react'
import Mobmap from '../component/Mobmap';
import trapsheet from '../whitepaper/trapSheet-v2.pdf'
// import { FaCode, FaPencilAlt, FaEnvelope, FaChartLine } from "react-icons/fa";

export default function Roadmap() {
  const [show, setShow] = useState(1)
  function _class(name) {
    return document.getElementsByClassName(name);
  }
  let tabPanes = document.getElementsByClassName("tab-head");

  for(let i=0;i<tabPanes.length;i++){
    tabPanes[i].addEventListener("click",function(){
      _class("tab-header")[0].getElementsByClassName("active")[0].classList.remove("active");
      tabPanes[i].classList.add("active");
      _class("tab-indicator")[0].style.top = `calc(80px + ${i*50}px)`;
      _class("tab-content")[0].getElementsByTagName("div")[i].classList.add("active");
    });
  }

  const handletab = (tab) => {
    setShow(tab);
  }

  return (
    <div id='roadmap-cont'>
      <div className="safe-defi roadmap-content container pt-5">
        <h2>Here's how we plan to take our project to a success - the roadmap.</h2>
        <p className='text-muted w-75 mt-3 mx-auto'>We don't plan to wait for business to come to us; instead, we will bring our services to the DeFi. We aim to deliver a quality service, and this is how we do it.</p>
      </div>
      <Mobmap/>
      <div className="roadmap">
        <div className="tabs">
          <div className="tab-header">
            <div className="tab-head active" onClick={() => handletab(1)}>
              {/* <FaCode className='fa'/> */} Phase I
            </div>
            <div className='tab-head' onClick={() => handletab(2)}>
              {/* <FaPencilAlt className='fa'/> */} Phase II
            </div>
            <div className='tab-head' onClick={() => handletab(3)}>
              {/* <FaChartLine className='fa'/> */} Phase III
            </div>
            <div className='tab-head' onClick={() => handletab(4)}>
              {/* <FaEnvelope className='fa'/>*/} Phase IV 
            </div>
          </div>
          <div className="tab-indicator"></div>
          <div className="tab-content">

            <div className="active">
             {show === 1 ?
             <>
             {/* <FaCode className='fa'/> */}
             {/* <h2>This is Roadmap 1</h2> */}
                <h3 className='ongoing'>Pre-Launch (Dec 2021 - Jan 2022)</h3>
              <p>
                <span className='ongoing'>• Private Sale to collect funds for development of platform & presale marketing<br/></span>• Beta Version of $BBT platform with "Safe Haven" <br />• Presale Marketing and promotions <br />• Listing of 100+ Project Owners, Developers, Influencers/Promoters</p>
              </>
            :""}
            </div>

            <div>
              {show === 2 ?
             <>
             {/* <FaPencilAlt className='fa'/> */}
              {/* <h2>This is Roadmap 2</h2> */}
              <h3>Post-Launch (Feb 2022)</h3>
              <p>
              • V1 of $BBT platform launch <br />• Listing of more Project Owners, Developers, Influencers/Promoters <br />• Post launch marketing campaign <br />• Major Listings & Tendings</p>
              </>
              :""}
            </div>

            <div>
            {show === 3 ?
             <>
              {/* <FaChartLine className='fa'/> */}
              {/* <h2>This is Roadmap 3</h2> */}
              <h3>Insuring DEFI (Mar 2022)</h3>
              <p>
              • Launch of Insurance on blockchain for $BBT holders <br />• Marketing campaign for Insurance platform <br />• Partnerships with major Insurance players</p>
              </>
              :""}
            </div>

            <div>
            {show === 4 ?
             <>
              {/* <FaEnvelope className='fa'/> */}
              <h3>(Apr - June 2022)</h3>
              <p>• Launchpad for projects willing to list on $BBT platform<br/>• VC Funding and Presale platforms<br/>• NFT Marketplace to be launched in Metaverse<br/>• First Insurance provider in Metaverse</p>
              </>
              :""}
            </div>

          </div>
        </div>
      </div>

      {/* TOKENOMICS */}
      <div className="tokenomics mx-auto pt-4" style={{ color: "#264B8C", width: "90%", maxWidth:"1440px" }}>
        <div className="row row-cols-1 mx-auto row-cols-md-3">
          <div className="col mb-4">
            <div className="card flex-column border-0 p-3" style={{ color: "#264B8C", backgroundColor: "#f9f9f9" }}>
              <div className="card-body">
                <p className="card-title h2">911911911</p>
                <p className="card-text">Total Supply</p>
              </div>
            </div>
          </div>
          <div className="col mb-4">
            <div className="card flex-column border-0 p-3" style={{ color: "#264B8C", backgroundColor: "#f9f9f9" }}>
              <div className="card-body">
                <p className="card-title h2">7%</p>
                <p className="card-text">Buy Tax*</p>
              </div>
            </div>
          </div>
          <div className="col mb-4">
            <div className="card flex-column border-0 p-3" style={{ color: "#264B8C", backgroundColor: "#f9f9f9" }}>
              <div className="card-body">
                <p className="card-title h2">10%</p>
                <p className="card-text">Sell Tax*</p>
              </div>
            </div>
          </div>
        </div>

        <p>*Tax breakdown:<br/>Buy- 4% Marketing Wallet, 1% Liquidity Pool, 1% Reflection and 1% Insurance<br/>Sell- 4% Marketing Wallet, 1% Liquidity Pool, 4% Reflection and 1% Insurance</p>
        <a href={trapsheet} rel="noreferrer" target="_blank" className="btn button-blue">Read Trapsheet</a>
      </div>
    </div>
  )
}
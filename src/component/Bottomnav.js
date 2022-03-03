import React, { useEffect, useState } from 'react'
import home from '../images/home-alt.svg'
import buybbt from '../images/square-vice-versa-alt.svg'
import trapsheet from '../images/sim.svg'
import safedefi from '../images/database.svg'
import stop from '../images/boobystop.svg'
import trapsheetpdf from '../whitepaper/BBT _TrapSheet_V3.pdf'
import {Link} from 'react-router-dom'
import client from '../client';
import {getBBTBalance} from '../Web3_connection/ContractMethods'

export default function Bottomnav() {

  // Fetch required number of Tokens for accessing Safe Haven
  const [BBTLimit, setBBTLimit] = useState(undefined)
  useEffect(() => {
    client.fetch(
      `*[_type == "minHolding"]{
        minBal,
      }`
    ).then((data) => setBBTLimit(data[0])).catch(console.error)
  }, []);
  

  const [BBTBal, setBBTBal] = useState(0)
  useEffect(() => {
    const fetchBal = async() => {
      let currentBal = await getBBTBalance()
      setBBTBal(currentBal)
    }
    fetchBal()
  }, [])

  return (
    <div className="d-lg-none bottomNav container-fluid">
      <nav>
        <div className="bottomBtn">
          <button className="btn">
            <Link id="mob-link" to="/"><img src={home} alt=""/><br/>Home</Link>
          </button>
          <button className="btn">
          <Link id="mob-link" to={BBTLimit && BBTBal >= BBTLimit.minBal ?`/safehaven/safuprojects`:`/ineligible`}><img src={safedefi} alt=""/><br/>Safe Haven</Link>
          </button>
          <button className="btn">
          <Link id="mob-link" to="/boobytrap/upcomingscam"><img src={stop} style={{height:"30px"}} alt=""/><br/>Booby<br/>Trap</Link>
          </button>
          <button className="btn">
            <Link to = {trapsheetpdf} id="mob-link" target = "_blank" rel="noreferrer"><img src={trapsheet} alt=""/><br/>Trapsheet</Link>
          </button>
          <a href="https://yachtpad.club/launchpad/BoobyTrap" id="mob-link" target = "_blank" rel="noreferrer"><button className="btn">
            <img src={buybbt} alt=""/><br/>Buy $BBT
          </button></a>
        </div>
      </nav>
    </div>
  );
}

import React, { useEffect, useState } from 'react'
import logo from "../images/logo.png"
import trapsheetpdf from '../whitepaper/BBT _TrapSheet_V3.pdf'
import { Link } from 'react-router-dom'
import { loginProcess, initInstance, getAccount } from "./../Web3_connection/web3_methods"
import { getTokenBalance, symbol } from './../Web3_connection/ContractMethods'
import SidebarSlide from './SidebarSlide'
import client from '../client';
import {getBBTBalance} from '../Web3_connection/ContractMethods'
import { FaTelegramPlane } from "react-icons/fa";
import Spinner from './Spinner/Spinner'

export default function Navbar() {

    // Fetch required number of Tokens for accessing Safe Haven
  const [BBTLimit, setBBTLimit] = useState(undefined)

  useEffect(() => {
    client.fetch(
      `*[_type == "minHolding"]{
        minBal,
      }`
    ).then((data) => setBBTLimit(data[0].minBal)).catch(console.error)
  }, []);
  

  const [BBTBal, setBBTBal] = useState(0)
  useEffect(() => {
    const fetchBal = async() => {
      let currentBal = await getBBTBalance()
      setBBTBal(currentBal)
    }
    fetchBal()
  }, [])


    const [tokenBal, setTokenBal] = useState(0)
    const [tokensymbol, setSymbol] = useState()
    useEffect(() => {
        login();

        const init = async () => {
            const bal = await getTokenBalance();
            const sym = await symbol();
            setTokenBal(bal)
            setSymbol(sym)
        }
        setInterval(() => {
            init();
        }, 4000)

    })
    const [userAddress, setUserAddress] = useState();
    const login = async () => {
        await initInstance();
        await loginProcess();
        const user = await getAccount();
        if (user) {
            setUserAddress(user)
        }
    }


    return (
        <div id='navbar-container'>
            <nav className="navbar mx-auto navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><img src={logo} alt="" /></Link>
                    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button> */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                {BBTBal >= BBTLimit ? <Link className="nav-link" to={`/safehaven/safuprojects`}>Safe Haven</Link> : <Link className="nav-link" to={`/ineligible`}>Safe Haven</Link>}
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/boobytrap/upcomingscam">Booby Trap</Link>
                            </li>
                            <li className="nav-item">
                                <a href={trapsheetpdf} target="_blank" rel="noreferrer" className="nav-link">Trapsheet</a>
                            </li>
                        </ul>
                        <a href="https://t.me/boobytrapbsc" target="_blank" rel="noreferrer" className="btn btn-outline-dark m-1"><FaTelegramPlane/></a>
                        {/* <a type="button" href='https://yachtpad.club/launchpad/BoobyTrap' className="btn btn-outline-dark m-1">Buy Presale</a> */}
                        <div className='position-relative'>
                            <button className="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">Buy $BBT</button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a className="dropdown-item" target="_blank" rel="noreferrer" href="https://pancakeswap.finance/swap?outputCurrency=0x609b88f5a4aBB7A55bA0c6d255C3F1b1bC7A4D76">Buy $BBT</a></li>
                                <li><a className="dropdown-item" target="_blank" rel="noreferrer" href="https://poocoin.app/tokens/0x609b88f5a4aBB7A55bA0c6d255C3F1b1bC7A4D76">View Chart</a></li>
                                {/* <li><a className="dropdown-item" target="_blank" rel="noreferrer" href=""></a></li> */}
                                <li><a className="dropdown-item" target="_blank" rel="noreferrer" href="/">Claim Tokens</a>
                                    <ul className="dropdown-menu dropdown-submenu">
                                        <li>
                                            <a className="dropdown-item" target="_blank" rel="noreferrer" href="https://yachtpad.club/launchpad/BoobyTrap">Presale</a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" target="_blank" rel="noreferrer" href="https://privatesale.boobytrap.live/">Pvt Sale</a>
                                        </li>
                                    </ul></li>
                            </ul></div>
                        {tokensymbol ? <p className='btn btn-outline-dark m-1'>Reward Balance: {tokenBal} {tokensymbol}</p> : <p className='btn btn-outline-dark m-1 d-flex'>Reward Balance: <Spinner size={25}/></p>}
                        <button type="button" className="btn button-blue m-1" onClick={() => login()}>{userAddress ? `${userAddress.slice(0, 5)}...${userAddress.slice(38)}` : `Connect Wallet`}</button>

                    </div>
                    <div className="mob-nav">
                        <a href="https://t.me/boobytrapbsc" target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-dark m-1"><FaTelegramPlane/></a>
                        <button type="button" className="btn button-blue m-1" onClick={() => login()}>{userAddress ? `${userAddress.slice(0, 5)}...${userAddress.slice(38)}` : `Connect Wallet`}</button>
                        <SidebarSlide right />
                    </div>
                </div>
            </nav>
        </div>
    )
}

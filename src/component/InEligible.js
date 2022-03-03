import React, {useState, useEffect} from 'react'
import client from '../client'
import {getBBTBalance} from '../Web3_connection/ContractMethods'
import {Link} from 'react-router-dom'

export default function InEligible() {

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

  return (
    <div style={{width:"100%", height:"100vh"}}>
      <div style={{position:"absolute", top:"50%", left:"50%", transform:"translate(-50%, -50%)", textAlign:"center", padding:"25px 50px"}}>
        <h2>YOU DO NOT HODL THE MINIMUM REQUIRED ({BBTLimit} $BBT) TOKENS TO ACCESS SAFE HAVEN</h2>
        <a href='https://pancakeswap.finance/swap?outputCurrency=0x609b88f5a4aBB7A55bA0c6d255C3F1b1bC7A4D76' style={BBTBal <= BBTLimit? {display:"block"}:{display:"none"}} target='_blank'><button className='getaccess btn button-blue px-2 mt-3'>GET ACCESS</button></a>
        <Link to='/safehaven/safuprojects' style={BBTBal >= BBTLimit? {display:"block"}:{display:"none"}}><button className='getaccess btn button-blue mt-3'>Access Safe Haven</button></Link>
      </div>
    </div>
  )
}

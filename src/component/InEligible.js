import React, {useState, useEffect} from 'react'
import client from '../client'

export default function InEligible() {

    // Fetch required number of Tokens for accessing Safe Haven
    const [BBTLimit, setBBTLimit] = useState(undefined)
    useEffect(() => {
      client.fetch(
        `*[_type == "minHolding"]{
          minBal,
        }`
      ).then( async(data) => setBBTLimit(data[0].minBal)).catch(console.error)
    }, []);
  return (
    <div style={{width:"100%", height:"100vh"}}>
      <div style={{position:"absolute", top:"50%", left:"50%", transform:"translate(-50%, -50%)", textAlign:"center", padding:"25px 50px"}}>
        <h2>YOU DO NOT HODL THE MINIMUM REQUIRED ({BBTLimit} $BBT) TOKENS TO ACCESS SAFE HAVEN</h2>
        <a href='https://pancakeswap.finance/swap' target='_blank'><button className='getaccess'>GET ACCESS</button></a>
      </div>
      
    </div>
  )
}

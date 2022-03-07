import './App.css';
import Bottomnav from './component/Bottomnav';
import Faqs from './component/Faqs';
import Footer from './component/Footer';
import Navbar from './component/Navbar';
import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './component/Home';
import Pagesafehaven from './component/Pagesafehaven';
import Ownercards from './component/Ownercards';
import Promoters from './component/Promoters';
import Influencers from './component/Influencers';
import Devcards from './component/Devcards';
import Ownerprofile from './component/Ownerprofile';
import Page404 from './component/Page404';
import Safecards from './component/Safecards';
import Projectpage from './component/Projectpage';
import UpcomingCards from './component/upcomingCards';
import Devprofile from './component/Devprofile';
import InfluencerProfile from './component/InfluencerProfile';
import PromoterProfile from './component/PromoterProfile';
import Ongoingcards from './component/Ongoingcards';
import Ongoingpage from './component/Ongoingpage';
import PageBoobyTrap from './component/PageBoobyTrap';
import UpcomingBoobytrap from './component/UpcomingBoobytrap';
import OngoingScam from './component/OngoingScam';
import OwnerScam from './component/OwnerScam';
import DevScam from './component/DevScam';
import InfluencerScam from './component/InfluencerScam';
import PromoterScam from './component/PromoterScam';
import {getBBTBalance} from './Web3_connection/ContractMethods'
import client from './client';
import InEligible from './component/InEligible';

function App() {

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

  if(BBTLimit){
    console.log(BBTBal,BBTLimit)
  }
  try{
    window.ethereum.on('accountsChanged', function (accounts) {
      window.location.reload();
    })
  }
  catch(e){
    //
  }
  console.log("balance is ",BBTBal)
  return (
    <div className="App" id='App'>
      <Router>
        <Navbar />
        <Bottomnav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="faqs" element={<Faqs />} />

          {/* Routes for Boobytrap */}
          <Route path="boobytrap" element={<PageBoobyTrap/>}>
            <Route path='upcomingscam' element={<UpcomingBoobytrap/>}/>
            <Route path='ongoingscam' element={<OngoingScam/>}/>
            <Route path='scamowner' element={<OwnerScam/>}/>
            <Route path='scamdev' element={<DevScam/>}/>
            <Route path='scaminfluencer' element={<InfluencerScam/>}/>
            <Route path='scampromoter' element={<PromoterScam/>}/>
          </Route>
          <Route path="/boobytrap/upcomingscam/:slug/:id/" element={<Projectpage/>}/>
          <Route path="/boobytrap/ongoingscam/:slug/:id/" element={<Ongoingpage/>}/>
          <Route path="/boobytrap/scamowner/:slug/:id/" element={<Ownerprofile/>}/>
          <Route path="/boobytrap/scamdev/:slug/:id/" element={<Devprofile/>}/>
          <Route path="/boobytrap/scaminfluencer/:slug/:id/" element={<InfluencerProfile/>}/>
          <Route path="/boobytrap/scampromoter/:slug/:id/" element={<PromoterProfile/>}/>

          {/* Routes for Safe Haven */}
        { true ? <>
            <Route path="safehaven" element={<Pagesafehaven balance={BBTBal}/>} >
              <Route path="projectowner" element={<Ownercards balance={BBTBal}/>} />
              <Route path="influencers" element={<Influencers balance={BBTBal}/>} />
              <Route path="developers" element={<Devcards balance={BBTBal}/>} />
              <Route path="promoters" element={<Promoters balance={BBTBal}/>} />
              <Route path="safuprojects" element={<Safecards balance={BBTBal}/>}/>
              <Route path="upcomingprojects" element={<UpcomingCards balance={BBTBal}/>}/>
              <Route path="ongoingprojects" element={<Ongoingcards balance={BBTBal}/>}/>
            </Route>
          <Route path="/safehaven/projectowner/:slug/:id/" element={<Ownerprofile balance={BBTBal}/>}/>
          <Route path="/safehaven/developers/:slug/:id/" element={<Devprofile balance={BBTBal}/>}/>
          <Route path="/safehaven/influencers/:slug/:id/" element={<InfluencerProfile balance={BBTBal}/>}/>
          <Route path="/safehaven/promoters/:slug/:id/" element={<PromoterProfile balance={BBTBal}/>}/>
          <Route path="/safehaven/safuprojects/:slug/:id" element={<Projectpage balance={BBTBal}/>}/>
          <Route path="/safehaven/ongoingprojects/:slug/:id" element={<Ongoingpage balance={BBTBal}/>}/>
          <Route path="/safehaven/upcomingprojects/:slug/:id" element={<Projectpage balance={BBTBal}/>}/>
          </>
         : <Route path='safehaven' element={<InEligible/>} />}
          
          {/* <Route path="/safehaven/boobytrap/:slug/:id" element={<Projectpage/>}/> */}
          <Route path="ineligible" element={<InEligible/>} />
          <Route path="*" element={<Page404/>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
import React, { useState, useEffect } from 'react'
import client from '../client'
import { Link, useParams } from "react-router-dom";
import BlockContent from "@sanity/block-content-to-react";
import ScriptTag from 'react-script-tag';

export default function Projectdetails() {

    const [singleProject, setSingleProject] = useState([]);
    const { slug, id } = useParams();

    useEffect(() => {
        client.fetch(
            `*[slug.current == "${slug}"] {
                name,
                email,
                tracker,
                slug,
                contract,
                trappoints,
                audit,
                kyc,
                marketingWallet,
                budget,
                tradingStartDate,
                initialMC,
                launchPrice,
                athMC,
                owner,
                marketingStatus,
                telegram,
                twitter,
                status,
                website,
                facebook,
                discord,
                instagram,
                reditt,
                youtube,
                other,
                tgOwner,
                devwallet,
                teamwallet,
                cmc,
                cg,
                cgId,
                holdersCount,
                exchanges,
                chart,
                expertOpinion,
                lpLocked,
                newlyLaunched,
                comStrength,
                devStatus,
                description,
            }`
        ).then((data) => setSingleProject(data[0]))
    }, [slug])
    
    // Fetch owner
    const [ownerName, setOwnerName] = useState([])
    useEffect(async() => {
        client.fetch(
            `*[_id == "${singleProject.owner._ref}"] {
                name,
            }`
        ).then((data) => setOwnerName(data[0]))
    }, [])
    
    return (
        <div className="row justify-content-center">
            <div style={window.location.pathname.includes("upcoming") === true? {display:"block"}:{display:"none"}}>
                <div className="container-fluid text-start overflow-hidden position-relative marquee" style={{ backgroundColor: "#EAEDF3", color: "#2D4E85", height: "24px", }}><p><b>Disclaimer</b>: Due to unavailability of detailed information on upcoming projects, BoobyTrap Team is unable to provide Trap Points (Expert Opinion) at the moment. Trap points will be updated in due course after launch. DYOR and exercise caution while investing in any Private/Presale in such projects.</p></div>
            </div>
            <div className="container-fluid overflow-hidden text-start fs-6">
                <ul id="skills">
                    <li className='card-bold-points font-monospace'><b>Trap Points:</b> {singleProject.trappoints}</li>
                    <li><b>Email:</b> {singleProject.email}</li>
                    <li><b>Contract:</b> {singleProject.contract}</li>
                    <li><b>Owner Name:</b> {ownerName.name}</li>
                    <li><b>Project Status:</b> {singleProject.newlyLaunched === true ? "Recently Launched" : singleProject.devStatus}{singleProject.status}</li>
                    <li><b>Community Strength:</b> {singleProject.comStrength}k+</li>
                    <li><b>KYC Link:</b> {singleProject.kyc}</li>
                    <li><b>Audit Link:</b> {singleProject.audit}</li>
                    <li><b>Trading Start Date:</b> {singleProject.tradingStartDate}</li>
                    <li><b>Liquidity Locked till:</b> {singleProject.lpLocked}</li>
                    <li><b>Marketing Budget:</b> ${singleProject.budget}k</li>
                    <li><b>Marketing Wallet:</b> {singleProject.marketingWallet == undefined ? "" : singleProject.marketingWallet.slice(0, 6) + "..." + singleProject.marketingWallet.slice(-4)}</li>
                    <li><b>Dev Wallet:</b> {singleProject.devwallet == undefined ? "" : singleProject.devwallet.slice(0, 6) + "..." + singleProject.devwallet.slice(-4)}</li>
                    <li><b>Team Wallet:</b> {singleProject.teamwallet == undefined ? "" : singleProject.teamwallet.slice(0, 6) + "..." + singleProject.teamwallet.slice(-4)}</li>
                    <li><b>CMC Link:</b> <a href={`${singleProject.cmc}`} target="_blank" rel="noreferrer">{singleProject.cmc}</a></li>
                    <li><b>CG Link:</b> <a href={`${singleProject.cg}`} target="_blank" rel="noreferrer">{singleProject.cg}</a></li>
                    <li><b>Exchange Listings:</b> {singleProject.exchanges}</li>
                    <li><b>Launch Price:</b> ${singleProject.launchPrice}</li>
                    <li><b>Initial MC:</b> ${singleProject.initialMC}</li>
                    <li><b>MC at ATH:</b> ${singleProject.athMC}</li>
                    <li><b>Exchange Listings:</b> {singleProject.exchanges}</li>
                    <li><b>Number of Holders:</b> {singleProject.holdersCount}</li>
                </ul>
                <h3 style={singleProject.cg === null ? { display: "block" } : { display: "none" }}>Chart Not Available</h3>
                <div className="row" style={singleProject.cg === null ? { display: "none" } : { display: "block" }}>
                    <h3>{singleProject.name} Price Chart ({singleProject.tracker})</h3>
                    <ScriptTag src="https://widgets.coingecko.com/coingecko-coin-ticker-widget.js"></ScriptTag>
                    <coingecko-coin-ticker-widget coin-id={singleProject.cgId} currency="usd" locale="en"></coingecko-coin-ticker-widget>
                    <ScriptTag src="https://widgets.coingecko.com/coingecko-coin-compare-chart-widget.js"></ScriptTag>
                    <coingecko-coin-compare-chart-widget coin-ids={singleProject.cgId} currency="usd" locale="en"></coingecko-coin-compare-chart-widget>
                </div>
                <h4>What our experts say:</h4>
                <BlockContent blocks={singleProject.expertOpinion} projectId="lfyw4jna" dataset="production" />
            </div>
        </div>
    );
}

import "../TempStyles/AddVote.css"

import {useEffect, useState} from 'react'
import bytecode from "../Contract/bytecode"
import ballotAbi from "../Contract/ballotAbi"
import admin from "../Contract/adminAddress"
import ballotAddress from "../Contract/ballotAddress"
const Web3 = require("web3")

const TempVote=()=>{

    var web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
    web3.eth.defaultAccount = web3.eth.accounts[0];

      const [tokens1, setTokens1] = useState('');
      const [tokens2, setTokens2] = useState('');
      const incand=localStorage.getItem('Incand');
      const techno=localStorage.getItem('Techno');

      const vote1=async()=>{
        console.log("tokens",tokens1)
        const BallotContract= new web3.eth.Contract(ballotAbi,incand)
        const voting= await BallotContract.methods.vote(tokens1).send({from : admin, gas: 6000000})
        const currBudget= await BallotContract.methods.currBudget().call({from:admin,gas:6000000});

        const vote=currBudget.voteCount;
        setTokens1('');

        // console.log("votes",vote)

      }

      const vote2=async()=>{
        console.log("tokens",tokens2)
        const BallotContract= new web3.eth.Contract(ballotAbi,techno)
        const voting= await BallotContract.methods.vote(tokens2).send({from : admin, gas: 6000000})
        const currBudget= await BallotContract.methods.currBudget().call({from:admin,gas:6000000});

        const vote=currBudget.voteCount;

        // console.log("votes",vote)
        setTokens2('')

      }
    return(
        <>
            <div className="container">
                <div className="left-panel">
                    <div className="left-panel-menu">
                    <div className="item"><a href="/user-add-vote">Dashboard</a></div>
                    <div className="item" ><a href="/user-result">Results</a></div>

                    <div className="item"><a href="#">Logout</a></div>
                </div>
                </div>
                <div className="right-panel">
                    
                    <div className="title">Budgets</div>
                    <div className="card-container">
                        <div className="card">
                        <div className="title2">Incand</div>
                            <p>Posted by : Gymkhana</p>
                            <p>Amount : 20000</p>
                            <p>Threshold: 400</p>
                            <p>Tokens:  <input type="text" 
                            onChange={(e)=>{setTokens1(e.target.value)}}/></p>
                            <div>
                                <button className="start-elect-btn" onClick={()=>{vote1()}}>Vote</button>
                               
                            </div>
                        </div>
                        <div className="card">
                            <div className="title2">Technoesis</div>
                            <p>Amount : 40000</p>
                            <p>Posted by : Gymkhana</p>
                            <p>Threshold: 400</p>
                            <p>Tokens:  <input type="text" 
                            onChange={(e)=>{setTokens2(e.target.value)}}/></p>
                            <div>
                                <button className="start-elect-btn" onClick={()=>{vote2()}}>Vote</button>
                               
                            </div>
                        </div>
                        
                       
                    </div>
                    
                </div>
            </div>

        </>
    )
}

export default TempVote;
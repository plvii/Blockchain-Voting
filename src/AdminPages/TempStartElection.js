import "../TempStyles/StartElection.css"

import {useEffect, useState} from 'react'
import bytecode from "../Contract/bytecode"
import abi from "../Contract/contractAbi"
import admin from "../Contract/adminAddress"
const Web3 = require("web3")

const StartElection=()=>{

    var web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
    web3.eth.defaultAccount = web3.eth.accounts[0];
    const [contractAddress,setContactAddress]=useState("");
    const [time,setTime]=useState("");
    const [start1,setStart1]=useState(false);
    const [start2,setStart2]=useState(false)

  useEffect(()=>{

    let Electioncreationcontract = new web3.eth.Contract(abi);

    let payload = {
        data: bytecode
    }

    let parameter = {
        from: admin,
        gas: Web3.utils.toHex(5000000),
        gasPrice: Web3.utils.toHex(Web3.utils.toWei('30', 'gwei'))
        }

    

    Electioncreationcontract.deploy(payload)
    .send(parameter)
    .then(receipt => {
        // Contract address
        // contractAddress = receipt.options.address;
        setContactAddress(receipt.options.address);
        // console.log("contract address=="+contractAddress);
    })
    .catch(error => {
        console.error(error);
    });

    
  },[])

  const handleSubmit1= async ()=>{
    // console.log("time=",time)
    setStart1(true)
    let Electioncreationcontract= new web3.eth.Contract(abi,contractAddress)
    Electioncreationcontract.options.address=contractAddress
    const results=await Electioncreationcontract.methods.startElect("incand","20000","gymkhana",400,120).send({from : admin, gas: 6000000})
    let ballots=await Electioncreationcontract.methods.getDeployedBallots().call({from : admin, gas: 6000000});
    alert("Election 1 started")
    console.log("ballots=",ballots)
    localStorage.setItem("Incand",ballots[0])

  } 

  const handleSubmit2= async ()=>{
    // console.log("time=",time)
    setStart2(true)
    let Electioncreationcontract= new web3.eth.Contract(abi,contractAddress)
    Electioncreationcontract.options.address=contractAddress
    const results=await Electioncreationcontract.methods.startElect("Technoesis","40000","gymkhana",400,120).send({from : admin, gas: 6000000})
    let ballots=await Electioncreationcontract.methods.getDeployedBallots().call({from : admin, gas: 6000000});

    alert("Election 2 started")
    console.log("ballots=",ballots)
    localStorage.setItem("Techno",ballots[1])

  } 

    return(
        <>
            <div className="container">
                <div className="left-panel">
                    <div className="left-panel-menu">
                    <div className="item"><a href="/admin-dashboard">Dashboard</a></div>
                        <div className="item" ><a href="/admin-add-budget">Add Budget</a></div>
                        <div className="item" ><a href="/admin-add-candidate">Add Candidate</a></div>
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
                            <p>Amount: 20000</p>
                            <p>Time : 2 mins</p>
                            <p>Threshold: 400</p>
                            {!start1?
                            <div>
                                <button className="start-elect-btn" 
                                onClick={()=>{handleSubmit1()}}>Start Election</button></div>:
                            <div>
                                <button className="start-elect-btn" 
                                >Started</button>    
                            </div>}
                            
                        </div>
                        <div className="card">
                             <div className="title2">Technoesis</div>
                            <p>Posted by : Gymkhana</p>
                            <p>Amount: 40000</p>
                            <p>Time :  2 mins</p>
                            <p>Threshold: 400</p>
                            
                            {!start2?
                            <div>
                                <button className="start-elect-btn" 
                                onClick={()=>{handleSubmit2()}}>Start Election</button></div>:
                            <div>
                                <button className="start-elect-btn" 
                                >Started</button>    
                            </div>}
                        </div>
                    </div>
                    
                </div>
            </div>

        </>
    )
}

export default StartElection;
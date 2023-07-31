
import {useEffect, useState} from 'react'
import bytecode from "../Contract/bytecode"
import abi from "../Contract/contractAbi"
import admin from "../Contract/adminAddress"
const Web3 = require("web3")


const StartElection=()=> {
  
    var web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
    web3.eth.defaultAccount = web3.eth.accounts[0];
    const [contractAddress,setContactAddress]=useState("");
    const [time,setTime]=useState("");

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

  const handleSubmit= async ()=>{
    // console.log("time=",time)
    let Electioncreationcontract= new web3.eth.Contract(abi,contractAddress)
    Electioncreationcontract.options.address=contractAddress
    const results=await Electioncreationcontract.methods.startElect("incand","20","gymkhana",600,time).send({from : admin, gas: 6000000})
    let ballots=await Electioncreationcontract.methods.getDeployedBallots().call({from : admin, gas: 6000000});
  
    console.log("ballots=",ballots)

  }

  return (
    <>
     <div id="content-container" >
			<div id="_bg__start_election"  ></div>
			<div id="election_" >
				Election:
			</div>
			
			<div id="select_start_time__" >
			Enter no. of hours:
			</div>
			</div>
			<form>
			<div id="starttim">
                <input type="text" 
                value={time} 
                onChange={(event)=>setTime(event.target.value)}/>
            </div>
			</form>
			<div id="back" ><button className="button button1">Back</button>
				
			</div>

			<div id="group_2"  >
                <button className="button button2"
                type="Submit" 
                onClick={()=>handleSubmit()}>
                Confirm
                </button>
			</div>

		
    </>
   
  );
}

export default StartElection;

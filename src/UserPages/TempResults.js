import "../TempStyles/Results.css"

import { useEffect, useState } from "react";

import ballotAbi from "../Contract/ballotAbi";
import admin from "../Contract/adminAddress";
import ballotAddress from "../Contract/ballotAddress";

const Web3 = require("web3")

const Results=()=>{

    var web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
    web3.eth.defaultAccount = web3.eth.accounts[0];
    const [threshold,setThreshold]=useState(0);
    const [endTime,setEndTime]=useState();

    const [results,setResults]=useState([]);

    const receiver="0x69e62AF50919C6c1a187bDfC4351D273E317F3F3";
    //comment

    const incand=localStorage.getItem('Incand');
    const techno=localStorage.getItem('Techno');

    console.log('incand',incand)
    console.log('techno',techno)

    useEffect(()=>{

        const getResults=async ()=>{
            const BallotContract= new web3.eth.Contract(ballotAbi,incand)
            
            // console.log(BallotContract.methods)
            const currBudget= await BallotContract.methods.currBudget().call({from:admin,gas:6000000});

            const BallotContract2= new web3.eth.Contract(ballotAbi,techno)
            
            // console.log(BallotContract.methods)
            const currBudget2= await BallotContract2.methods.currBudget().call({from:admin,gas:6000000});
            
            const budget=currBudget.budgetTitle;
            const amount='2';
            const postedBy=currBudget.budgetPostedBy;
            const threshold=currBudget.threshold;

            const vote=currBudget.voteCount;

            const budget2=currBudget2.budgetTitle;
            const amount2='2';
            const postedBy2=currBudget2.budgetPostedBy;
            const threshold2=currBudget2.threshold;

            const vote2=currBudget2.voteCount;
            setEndTime(currBudget.expirationDate);

            console.log("creation time=",currBudget.creationDate);
            console.log("end time=",currBudget.expirationDate);
            
            const currentTimestamp = Math.floor(Date.now() / 1000);

            console.log("current time",currentTimestamp)
            // console.log("thresholdddd",currBudget.threshold)
     

            if(currentTimestamp<currBudget.expirationDate)
            {
                console.log("not over")
            }
            else{
                console.log("over")
                if(currBudget.voteCount<=threshold)
                {
                    const etherAmount = web3.utils.toWei('1', "ether");
                    web3.eth.sendTransaction({
                        from: admin,
                        to: receiver,
                        value: etherAmount
                    }, (error, transactionHash) => {
                        // Handle error and transaction hash
                        console.log("error",error)
                    });
                }
                
            }
    
    
            setResults([[budget,postedBy,amount,vote,threshold],[budget2,postedBy2,amount2,vote2,threshold2]]);
        }

        getResults();
        //comment

    },[])

    return(<>

    <div className="container">
        <div className="left-panel">
            <div className="left-panel-menu">
                <div className="item"><a href="/user-add-vote">Dashboard</a></div>
                <div className="item" ><a href="/user-result">Results</a></div>

                <div className="item"><a href="#">Logout</a></div>
            </div>
        </div>
        <div className="right-panel">
            
            <div className="title">Results</div>

            <form className="results">
                <table className="result-table">
                <thead className="table-header">
                    <tr>
                    <th className="input-text">Title</th>
                    <th className="input-text">Posted By</th>
                    <th className="input-text">Amount</th>
                    <th className="input-text">Votes</th>
                    <th className="input-text">Threshold</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((rowData, rowIndex) => (
                    <tr key={rowIndex}>
                        {rowData.map((cellData, colIndex) => (
                        <td key={colIndex} className="table-data">
                            <input
                            type="text"
                            readOnly
                            value={cellData}
                            onChange={(event) => {
                                const newData = [...results];
                                newData[rowIndex][colIndex] = event.target.value;
                                // setResults(newData);
                            }}
                            />
                        </td>
                        ))}
                    </tr>
                    ))}
                </tbody>
                </table>

            </form>
            
        </div>
    </div>
    </>)
}

export default Results;
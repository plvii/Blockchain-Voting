import "../TempStyles/AddBudget.css"
import { useEffect, useState } from "react";
import BudgetArray from "../Database/BudgetArray";

const AddBuget=()=>{

    const [title, setTitle] = useState('');
    const [postedBy,setPostedBy]=useState('');
    const [amount,setAmount]=useState('');
    const [threshold,setThreshold]=useState('');
    const [time,setTime]=useState('');

    const addBudget=()=>{
        setTitle('');setPostedBy('');setAmount('');setThreshold('');setTime('');
        alert("Budget has been added");
        console.log(BudgetArray);
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
                    <div className="title">Add Budget</div>
                    <div className="form-container">
                        <div className="input-container">
                            <div className="input-text">Title : </div>
                            <input type="text" 
                            className="input1"
                            value={title}
                            onChange={(e)=>{setTitle(e.target.value)}}/>
                        </div>
                        <div className="input-container">
                            <div className="input-text">Posted By : </div>
                            <input type="text" 
                            className="input1"
                            value={postedBy}
                            onChange={(e)=>{setPostedBy(e.target.value)}}/>
                        </div>
                        <div className="input-container">
                            <div className="input-text">Amount : </div>
                            <input type="text" 
                            className="input1"
                            value={amount}
                            onChange={(e)=>{setAmount(e.target.value)}}/>
                        </div>
                        <div className="input-container">
                            <div className="input-text">Threshold : </div>
                            <input type="text" 
                            className="input1"
                            value={threshold}
                            onChange={(e)=>{setThreshold(e.target.value)}}/>
                        </div>
                        <div className="input-container">
                            <div className="input-text">Time : </div>
                            <input type="text" 
                            className="input1"
                            value={time}
                            onChange={(e)=>{setTime(e.target.value)}}/>
                        </div>
                        <button className="add-budget" onClick={()=>{addBudget()}}>Submit</button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AddBuget
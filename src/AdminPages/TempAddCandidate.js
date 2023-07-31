import "../TempStyles/AddCandidate.css"

const AddCandidate=()=>{
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
                    <div className="title">Add Candidate</div>
                    <div className="form-container">
                        <div className="input-container">
                            <div className="input-text">Name : </div>
                            <input type="text" className="input1"/>
                        </div>
                        <div className="input-container">
                            <div className="input-text">Tokens : </div>
                            <input type="text" className="input1"/>
                        </div>
                        <div className="input-container">
                            <div className="input-text">Level : </div>
                            <input type="text" className="input1"/>
                        </div>
                        <button className="add-budget">Submit</button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AddCandidate
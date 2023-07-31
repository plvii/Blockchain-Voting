import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartElection from "./Pages/StartElection";
import HomePage from "./Pages/HomePage";
import Voting from './Pages/Voting';
import Results from './Pages/Results';
import TempStartElection from './AdminPages/TempStartElection';
import TempAddBuget from './AdminPages/TempAddBudget';
import TempResults from './UserPages/TempResults';
import TempVote from './UserPages/TempVote';
import TempAddCandidate from './AdminPages/TempAddCandidate';


function App() {

  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<HomePage/>} />
          <Route path="/startElect" element={<StartElection/>} />
          <Route path="/vote" element={<Voting/>} />
          <Route path="/results" element={<Results/>}/>
          <Route path="/admin-dashboard" element={<TempStartElection/>}></Route>
          <Route path="/admin-add-budget" element={<TempAddBuget/>}></Route>
          <Route path="/user-result" element={<TempResults/>}></Route>
          <Route path="/user-add-vote" element={<TempVote/>}></Route>
          <Route path="/admin-add-candidate" element={<TempAddCandidate/>}></Route>
        </Routes>
      </div>
      
  </Router>
   
  );
}

export default App;

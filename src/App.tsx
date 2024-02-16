// import './App.css';
// import ListGroup from "./components/ListGroup";

// function App (){
//   return <div><ListGroup /></div>
// }

// export default App;

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListGroup from "./components/ListGroup";
import AddQuestionsForm from "./components/AddQuestionsManually";
// import TestQuery from "./components/Test";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-warning nav-brand">

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto" >
              <li className="nav-item active">
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/add-questions">
                  Add questions
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#">
                Add questions programmatically
                </a>
              </li>
            </ul>
            
          </div>
        </nav>


        <Routes>
          <Route path="/" element={<ListGroup />} /> 
          <Route path="/add-questions" element={<AddQuestionsForm />} /> 
          {/* <Route path="/test" element={<TestQuery />} />  */}

        </Routes>
      </div>
    </Router>
  );
}

export default App;

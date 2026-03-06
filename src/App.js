import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Growth from "./pages/Growth";
import Vaccination from "./pages/Vaccination";

function App() {
  return (
    <Router>

      <Navbar/>

      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/growth" element={<Growth/>}/>
        <Route path="/vaccination" element={<Vaccination/>}/>
      </Routes>

    </Router>
  );
}

export default App;

import { Link } from "react-router-dom";

function Navbar(){

 return(

  <div className="navbar">

   <h2>👶 Baby Health Tracker</h2>

   <div>
    <Link to="/">Dashboard</Link>
    <Link to="/growth">Growth</Link>
    <Link to="/vaccination">Vaccines</Link>
   </div>

  </div>

 )

}

export default Navbar

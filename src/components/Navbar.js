import { NavLink } from "react-router-dom";

function Navbar() {
    return <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="navbar-brand">
            <h4>NIMS HOSPITAL</h4>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse"
            data-target="#navbarNav" aria-controls="navbarNav"aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div
        className="collapse navbar-collapse mr-auto" id="navbarNav"  style={{ float: "left" }}>
            <ul className="navbar-nav ml-auto" style={{ color: "#ffffff" }}>
                {/* <li className="nav-item">
                <NavLink to={"/"} className={ 'nav-link '+(status => status.isActive ? 'active' : '')}>
                    App
                </NavLink>
                </li> */}
                {/* <li className="nav-item">
               <NavLink to={"/"} className={ 'nav-link '+(status => status.isActive ? 'active' : '')}>
               App</NavLink>
               </li> */}

               <li className="nav-item">
               <NavLink to={"/register"} className={ 'nav-link '+(status => status.isActive ? 'active' : '')}>
               Register</NavLink>
               </li>

               <li className="nav-item">
               <NavLink to={"/UserLogin"} className={ 'nav-link '+(status => status.isActive ? 'active' : '')}>
               Login</NavLink>
               </li>

               <li className="nav-item">
               <NavLink to={"/DoctorList"} className={ 'nav-link '+(status => status.isActive ? 'active' : '')}>
               Doctor's List</NavLink>
               </li>

               <li className="nav-item">
               <NavLink to={"/BookAppointment"} className={ 'nav-link '+(status => status.isActive ? 'active' : '')}>
               Book Appointment</NavLink>
               </li>
               
               <li className="nav-item">
               <NavLink to={"/MyAppointments"} className={ 'nav-link '+(status => status.isActive ? 'active' : '')}>
               Appointments</NavLink>
               </li>

               <li className="nav-item">
               <NavLink to={"/UpdateProfile"} className={ 'nav-link '+(status => status.isActive ? 'active' : '')}>
               UpdateProfile</NavLink>
               </li>

               <li className="nav-item">
               <NavLink to={"/Logout"} className={ 'nav-link '+(status => status.isActive ? 'active' : '')}>
               Logout</NavLink>
               </li>
            </ul>
        </div>
    </nav>;
}

export default Navbar;
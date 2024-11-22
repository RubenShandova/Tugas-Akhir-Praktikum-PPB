import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Flight from "./components/Flight";
import Shipping from "./components/Shipping";
import Electricity from "./components/Electricity";
import Vehicle from "./components/Vehicle";
import FuelCombustion from "./components/FuelCombustion";
import VehicleMakes from "./components/VehicleMakes";

import About from "./components/About";
import Details from "./components/Details";
import "./styles/style.css";

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/flight" element={<Flight />} />
                        <Route path="/shipping" element={<Shipping />} />
                        <Route path="/electricity" element={<Electricity />} />
                        <Route path="/vehicle" element={<Vehicle />} />
                        <Route path="/fuelcombustion" element={<FuelCombustion />} />
                        <Route path="/vehiclemakes" element={<VehicleMakes />} />
                        
                        <Route path="/about" element={<About />} />
                        <Route path="/details/:id" element={<Details />} />
                    </Routes>
                </div>
                <nav className="bottom-nav">
                    <Link to="/" className="nav-item">Home</Link>
                    <Link to="/flight" className="nav-item">Flight</Link>
                    <Link to="/shipping" className="nav-item">Shipping</Link>
                    <Link to="/electricity" className="nav-item">Electricity</Link>
                    <Link to="/vehicle" className="nav-item">Vehicle</Link>
                    <Link to="/fuelcombustion" className="nav-item">FuelCombustion</Link>
                    <Link to="/vehiclemakes" className="nav-item">VehicleMakes</Link>
                    
                    <Link to="/about" className="nav-item">About</Link>
                </nav>
            </div>
        </Router>
    );
};

export default App;

import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const items = [
        { id: 1, name: "Flight Estimation" },
        { id: 2, name: "Shipping Estimation" },
        { id: 3, name: "Electricity Estimation" },
        { id: 4, name: "Vehicle Estimation" },
        { id: 5, name: "Fuel Combustion Estimation" },
        { id: 6, name: "Vehicle List Makes Carbon Estimation" },
        
    ];

    return (
        <div className="page-container">
            <h1 className="page-title">Home</h1>
            <ul className="item-list">
                {items.map((item) => (
                    <li key={item.id} className="item">
                        <Link to={`/details/${item.id}`} className="item-link">
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;

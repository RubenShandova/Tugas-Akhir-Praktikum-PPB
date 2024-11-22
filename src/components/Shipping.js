import React, { useState } from "react";
import { fetchCarbonEstimate } from "../api";

const Shipping = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [weight, setWeight] = useState(200); // dalam gram
    const [distance, setDistance] = useState(2000); // dalam kilometer
    const [transportMethod, setTransportMethod] = useState("truck");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setData(null);

        try {
            const estimate = await fetchCarbonEstimate({
                type: "shipping",
                weight_value: weight,
                weight_unit: "g",
                distance_value: distance,
                distance_unit: "km",
                transport_method: transportMethod,
            });
            setData(estimate);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="shipping-container">
            <h2 className="section-title">Shipping Carbon Emission Estimator</h2>
            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-field">
                    <label>
                        Weight (grams):
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="input-field"
                        />
                    </label>
                </div>
                <div className="form-field">
                    <label>
                        Distance (km):
                        <input
                            type="number"
                            value={distance}
                            onChange={(e) => setDistance(e.target.value)}
                            className="input-field"
                        />
                    </label>
                </div>
                <div className="form-field">
                    <label>
                        Transport Method:
                        <select
                            value={transportMethod}
                            onChange={(e) => setTransportMethod(e.target.value)}
                            className="input-field"
                        >
                            <option value="truck">Truck</option>
                            <option value="ship">Ship</option>
                            <option value="train">Train</option>
                            <option value="airplane">Airplane</option>
                        </select>
                    </label>
                </div>
                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? "Calculating..." : "Estimate Carbon Emission"}
                </button>
            </form>
            {data && (
                <div className="results-container">
                    <h3>Results:</h3>
                    <p><strong>Weight:</strong> {data.weight_value} {data.weight_unit}</p>
                    <p><strong>Carbon Emission (kg):</strong> {data.carbon_kg}</p>
                    <p><strong>Distance:</strong> {data.distance_value} {data.distance_unit}</p>
                    <p><strong>Transport Method:</strong> {data.transport_method}</p>
                </div>
            )}
        </div>
    );
};

export default Shipping;

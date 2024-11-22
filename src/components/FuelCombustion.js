import React, { useState } from "react";
import { fetchCarbonEstimate } from "../api";

const FuelCombustion = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [fuelSourceType] = useState("dfo"); // tipe sumber bahan bakar
    const [fuelSourceUnit] = useState("btu"); // unit bahan bakar
    const [fuelSourceValue, setFuelSourceValue] = useState(2); // nilai bahan bakar

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setData(null);

        try {
            const estimate = await fetchCarbonEstimate({
                type: "fuel_combustion",
                fuel_source_type: fuelSourceType,
                fuel_source_unit: fuelSourceUnit,
                fuel_source_value: fuelSourceValue,
            });
            setData(estimate);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fuel-combustion-container" style={{ padding: "20px", backgroundColor: "#f4f7fc", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", maxWidth: "600px", margin: "auto" }}>
            <h2 className="section-title" style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>Fuel Combustion Carbon Emission Estimator</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <div className="form-field">
                    <label style={{ color: "#28a745", fontSize: "18px", fontWeight: "bold" }}>
                        Fuel Source Type:
                        <p style={{ padding: "10px", borderRadius: "5px", backgroundColor: "#f1f1f1", fontSize: "16px", color: "#555", marginTop: "5px" }}>
                            {fuelSourceType}
                        </p>
                    </label>
                </div>
                <div className="form-field">
                    <label style={{ color: "#28a745", fontSize: "18px", fontWeight: "bold" }}>
                        Fuel Source Unit:
                        <p style={{ padding: "10px", borderRadius: "5px", backgroundColor: "#f1f1f1", fontSize: "16px", color: "#555", marginTop: "5px" }}>
                            {fuelSourceUnit}
                        </p>
                    </label>
                </div>
                <div className="form-field">
                    <label style={{ color: "#28a745", fontSize: "18px", fontWeight: "bold" }}>
                        Fuel Source Value:
                        <input
                            type="number"
                            value={fuelSourceValue}
                            onChange={(e) => setFuelSourceValue(e.target.value)}
                            className="input-field"
                            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                        />
                    </label>
                </div>
                <button type="submit" className="submit-btn" style={{ padding: "10px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px" }} disabled={loading}>
                    {loading ? "Calculating..." : "Estimate Carbon Emission"}
                </button>
            </form>
            {data && (
                <div className="results-container" style={{ marginTop: "20px", backgroundColor: "#f9f9f9", padding: "15px", borderRadius: "8px" }}>
                    <h3 style={{ color: "#007bff", fontSize: "18px" }}>Results:</h3>
                    <p style={{ color: "#007bff", fontSize: "16px" }}><strong>Fuel Source Type:</strong> {data.fuel_source_type}</p>
                    <p style={{ color: "#007bff", fontSize: "16px" }}><strong>Fuel Source Unit:</strong> {data.fuel_source_unit}</p>
                    <p style={{ color: "#007bff", fontSize: "16px" }}><strong>Fuel Source Value:</strong> {data.fuel_source_value}</p>
                    <p style={{ color: "#007bff", fontSize: "16px" }}><strong>Carbon Emission (kg):</strong> {data.carbon_kg}</p>
                    <p style={{ color: "#007bff", fontSize: "16px" }}><strong>Carbon Emission (g):</strong> {data.carbon_g}</p>
                    <p style={{ color: "#007bff", fontSize: "16px" }}><strong>Estimated At:</strong> {data.estimated_at}</p>
                </div>
            )}
        </div>
    );
};

export default FuelCombustion;

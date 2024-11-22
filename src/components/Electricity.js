import React, { useState } from "react";
import { fetchElectricityEstimate } from "../api";

const Electricity = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [electricityValue, setElectricityValue] = useState(42); // nilai konsumsi listrik dalam mwh
    const [country] = useState("us");  // Country yang tidak dapat diubah
    const [state] = useState("fl");   // State yang tidak dapat diubah

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setData(null);

        try {
            const estimate = await fetchElectricityEstimate({
                type: "electricity",
                electricity_unit: "mwh",
                electricity_value: electricityValue,
                country,
                state,
            });
            setData(estimate);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="electricity-container" style={{ padding: "20px", backgroundColor: "#f4f7fc", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", maxWidth: "600px", margin: "auto" }}>
            <h2 className="section-title" style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>Electricity Carbon Emission Estimator</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <div className="form-field">
                    <label style={{ color: "#28a745", fontSize: "18px", fontWeight: "bold" }}>
                        Electricity Value (mwh):
                        <input
                            type="number"
                            value={electricityValue}
                            onChange={(e) => setElectricityValue(e.target.value)}
                            className="input-field"
                            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                        />
                    </label>
                </div>
                <div className="form-field">
                    <label style={{ color: "#28a745", fontSize: "18px", fontWeight: "bold" }}>
                        Country:
                        <p style={{ padding: "10px", borderRadius: "5px", backgroundColor: "#f1f1f1", fontSize: "16px", color: "#555", marginTop: "5px" }}>
                            {country.toUpperCase()}
                        </p>
                    </label>
                </div>
                <div className="form-field">
                    <label style={{ color: "#28a745", fontSize: "18px", fontWeight: "bold" }}>
                        State:
                        <p style={{ padding: "10px", borderRadius: "5px", backgroundColor: "#f1f1f1", fontSize: "16px", color: "#555", marginTop: "5px" }}>
                            {state.toUpperCase()}
                        </p>
                    </label>
                </div>
                <button type="submit" className="submit-btn" style={{ padding: "10px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px" }} disabled={loading}>
                    {loading ? "Calculating..." : "Estimate Carbon Emission"}
                </button>
            </form>
            {data && (
                <div className="results-container" style={{ marginTop: "20px", backgroundColor: "#f9f9f9", padding: "15px", borderRadius: "8px" }}>
                    <h3 style={{ color: "#007bff", fontSize: "18px" }}>Results:</h3>
                    <p style={{ color: "#007bff", fontSize: "16px" }}><strong>Electricity Value:</strong> {data.electricity_value} {data.electricity_unit}</p>
                    <p style={{ color: "#007bff", fontSize: "16px" }}><strong>Carbon Emission (kg):</strong> {data.carbon_kg}</p>
                    <p style={{ color: "#007bff", fontSize: "16px" }}><strong>Country:</strong> {data.country}</p>
                    <p style={{ color: "#007bff", fontSize: "16px" }}><strong>State:</strong> {data.state}</p>
                </div>
            )}
        </div>
    );
};

export default Electricity;

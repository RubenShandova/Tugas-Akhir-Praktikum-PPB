import React, { useState } from "react";
import { fetchCarbonEstimate } from "../api";

const Vehicle = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [distance, setDistance] = useState(100); // dalam mil
    const [vehicleModelId] = useState("7268a9b7-17e8-4c8d-acca-57059252afe9"); // Contoh ID

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setData(null);

        try {
            const estimate = await fetchCarbonEstimate({
                type: "vehicle",
                distance_unit: "mi",
                distance_value: distance,
                vehicle_model_id: vehicleModelId,
            });
            setData(estimate);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="vehicle-container" style={{ padding: "20px", backgroundColor: "#f4f7fc", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", maxWidth: "600px", margin: "auto" }}>
            <h2 className="section-title" style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>Vehicle Carbon Emission Estimator</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <div className="form-field">
                    <label style={{ color: "#28a745", fontSize: "18px", fontWeight: "bold" }}>
                        Distance (miles):
                        <input
                            type="number"
                            value={distance}
                            onChange={(e) => setDistance(e.target.value)}
                            className="input-field"
                            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                        />
                    </label>
                </div>
                <div className="form-field">
                    <label style={{ color: "#28a745", fontSize: "18px", fontWeight: "bold" }}>
                        Vehicle Model ID:
                        <p style={{ padding: "10px", borderRadius: "5px", backgroundColor: "#f1f1f1", fontSize: "16px", color: "#555", marginTop: "5px" }}>
                            {vehicleModelId}
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
                    <p style={{ color: "#007bff", fontSize: "16px" }}><strong>Distance:</strong> {data.distance_value} {data.distance_unit}</p>
                    <p style={{ color: "#007bff", fontSize: "16px" }}><strong>Vehicle Make:</strong> {data.vehicle_make}</p>
                    <p style={{ color: "#007bff", fontSize: "16px" }}><strong>Vehicle Model:</strong> {data.vehicle_model}</p>
                    <p style={{ color: "#007bff", fontSize: "16px" }}><strong>Vehicle Year:</strong> {data.vehicle_year}</p>
                    <p style={{ color: "#007bff", fontSize: "16px" }}><strong>Carbon Emission (kg):</strong> {data.carbon_kg}</p>
                </div>
            )}
        </div>
    );
};

export default Vehicle;

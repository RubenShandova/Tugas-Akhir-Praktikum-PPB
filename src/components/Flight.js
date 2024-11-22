import React, { useState } from "react";
import { fetchCarbonEstimate } from "../api";

const Flight = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [passengers, setPassengers] = useState(1);
    const [legs] = useState([
        { departure_airport: "SFO", destination_airport: "YYZ" }, // Misal sudah diisi dengan airport yang tetap
    ]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setData(null);

        try {
            const estimate = await fetchCarbonEstimate({
                type: "flight",
                passengers: parseInt(passengers),
                legs,
            });
            setData(estimate);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    // Inline styles
    const styles = {
        mainContent: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            backgroundColor: "#f4f7fc",
            height: "100vh",
        },
        card: {
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "600px",
            padding: "20px",
            boxSizing: "border-box",
        },
        sectionTitle: {
            textAlign: "center",
            marginBottom: "20px",
            color: "#333",
            fontSize: "24px",
        },
        formContainer: {
            display: "flex",
            flexDirection: "column",
            gap: "15px",
        },
        formField: {
            display: "flex",
            flexDirection: "column",
        },
        inputField: {
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
        },
        submitBtn: {
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
        },
        submitBtnDisabled: {
            backgroundColor: "#ccc",
            cursor: "not-allowed",
        },
        legContainer: {
            padding: "10px 0",
        },
        airportInfo: {
            fontSize: "16px",
            color: "#555",
            marginTop: "5px",
            padding: "5px",
            backgroundColor: "#f1f1f1",
            borderRadius: "5px",
        },
        labelGreen: {
            color: "#28a745",  // Warna hijau
            fontSize: "18px",
            fontWeight: "bold",
        },
        resultsContainer: {
            marginTop: "20px",
            backgroundColor: "#f9f9f9",
            padding: "15px",
            borderRadius: "8px",
        },
        resultsList: {
            listStyle: "none",
            padding: "0",
        },
        resultsListItem: {
            marginBottom: "5px",
            color: "#333",
        },
        resultsText: {
            color: "#007bff", // Warna biru untuk teks hasil
            fontSize: "18px",
        },
    };

    return (
        <div style={styles.mainContent}>
            <div style={styles.card}>
                <h2 style={styles.sectionTitle}>Flight Carbon Emission Estimator</h2>
                <form onSubmit={handleSubmit} style={styles.formContainer}>
                    <div style={styles.formField}>
                        <label htmlFor="passengers" style={styles.labelGreen}>Passengers:</label>
                        <input
                            id="passengers"
                            type="number"
                            value={passengers}
                            onChange={(e) => setPassengers(e.target.value)}
                            min="1"
                            style={styles.inputField}
                        />
                    </div>
                    {legs.map((leg, index) => (
                        <div key={index} style={styles.legContainer}>
                            <div style={styles.formField}>
                                <label style={styles.labelGreen}>Departure Airport:</label>
                                <p style={styles.airportInfo}>{leg.departure_airport}</p>
                            </div>
                            <div style={styles.formField}>
                                <label style={styles.labelGreen}>Destination Airport:</label>
                                <p style={styles.airportInfo}>{leg.destination_airport}</p>
                            </div>
                        </div>
                    ))}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            ...styles.submitBtn,
                            ...(loading ? styles.submitBtnDisabled : {}),
                        }}
                    >
                        {loading ? "Calculating..." : "Estimate Carbon Emission"}
                    </button>
                </form>
                {data && (
                    <div style={styles.resultsContainer}>
                        <h3 style={styles.resultsText}>Results:</h3>
                        <p style={styles.resultsText}><strong>Passengers:</strong> {data.passengers}</p>
                        <p style={styles.resultsText}><strong>Carbon Emission (kg):</strong> {data.carbon_kg}</p>
                        <p style={styles.resultsText}><strong>Distance:</strong> {data.distance_value} {data.distance_unit}</p>
                        <ul style={styles.resultsList}>
                            {data.legs.map((leg, index) => (
                                <li key={index} style={styles.resultsListItem}>
                                    {leg.departure_airport} → {leg.destination_airport}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Flight;

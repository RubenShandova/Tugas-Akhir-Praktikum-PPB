import React, { useState, useEffect } from "react";
import axios from "axios";
// Pastikan untuk mengimpor file CSS

const VehicleMakes = () => {
    const [loading, setLoading] = useState(false);
    const [vehicleMakes, setVehicleMakes] = useState([]);
    const [vehicleModels, setVehicleModels] = useState([]); // State untuk menyimpan model kendaraan yang dipilih
    const [error, setError] = useState(null);
    const [selectedMake, setSelectedMake] = useState(null); // State untuk merekam merek kendaraan yang dipilih

    useEffect(() => {
        const fetchVehicleMakes = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(
                    "https://www.carboninterface.com/api/v1/vehicle_makes",
                    {
                        headers: {
                            Authorization: `Bearer aNrRpob4Q7sneiHNJcccA`, // Gunakan API Key Anda
                            "Content-Type": "application/json",
                        },
                    }
                );
                const data = response.data.map((item) => ({
                    id: item.data.id,
                    name: item.data.attributes.name,
                    numberOfModels: item.data.attributes.number_of_models,
                }));
                setVehicleMakes(data);
            } catch (err) {
                console.error("Error fetching vehicle makes:", err.response?.data || err.message);
                setError("Failed to load vehicle makes.");
            } finally {
                setLoading(false);
            }
        };

        fetchVehicleMakes();
    }, []);

    const handleMakeClick = async (makeId) => {
        setLoading(true);
        setError(null);
        setSelectedMake(makeId); // Set make yang dipilih

        try {
            const response = await axios.get(
                `https://www.carboninterface.com/api/v1/vehicle_makes/${makeId}/vehicle_models`,
                {
                    headers: {
                        Authorization: `Bearer aNrRpob4Q7sneiHNJcccA`, // Gunakan API Key Anda
                        "Content-Type": "application/json",
                    },
                }
            );

            const models = response.data.slice(0, 200).map((item) => ({
                id: item.data.id,
                name: item.data.attributes.name,
                year: item.data.attributes.year,
            }));
            setVehicleModels(models);
        } catch (err) {
            console.error("Error fetching vehicle models:", err.response?.data || err.message);
            setError("Failed to load vehicle models.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="vehicle-makes-container">
            <h2 className="section-title">List Mobil yang Berpotensi Meningkatkan Emisi Karbon</h2>
            {loading && <p className="loading-text">Loading...</p>}
            {error && <p className="error-message">{error}</p>}
            
            {!loading && !error && !selectedMake && (
                <ul className="vehicle-makes-list">
                    {vehicleMakes.map((make) => (
                        <li 
                            key={make.id} 
                            className="vehicle-make-item"
                            onClick={() => handleMakeClick(make.id)}
                        >
                            <strong>{make.name}</strong> - {make.numberOfModels} models
                        </li>
                    ))}
                </ul>
            )}

            {selectedMake && !loading && !error && (
                <div className="vehicle-models-container">
                    <h3 className="models-title">
                        Models of {vehicleMakes.find(make => make.id === selectedMake)?.name}
                    </h3>
                    <button 
                        onClick={() => setSelectedMake(null)} 
                        className="back-btn"
                    >
                        Back to Vehicle Makes
                    </button>
                    <ul className="vehicle-models-list">
                        {vehicleModels.length > 0 ? (
                            vehicleModels.map((model) => (
                                <li key={model.id} className="vehicle-model-item">
                                    <div className="model-card">
                                        <strong>{model.name}</strong> - Year: {model.year}
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p>No models available for this make.</p>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default VehicleMakes;

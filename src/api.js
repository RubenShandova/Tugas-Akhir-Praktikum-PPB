import axios from "axios";
import { API_KEY, BASE_URL } from "./config";

// Fungsi untuk estimasi karbon (umum)
export const fetchCarbonEstimate = async (data) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/estimates`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data.data.attributes;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

// Fungsi untuk estimasi listrik
export const fetchElectricityEstimate = async (payload) => {
    try {
        const response = await fetch("https://www.carboninterface.com/api/v1/estimates", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${API_KEY}`, // Pastikan mengganti placeholder API_KEY
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.data.attributes; // Mengembalikan data atribut estimasi listrik
    } catch (error) {
        console.error("Error fetching electricity estimate:", error);
        throw error;
    }
};

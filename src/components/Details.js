import React from "react";
import { useParams, Link } from "react-router-dom";

const Details = () => {
    const { id } = useParams();

    const detailsData = {
        1: {
            title: "Flight Carbon Emission Estimator",
            description:
                "Menghitung Perkiraan Emisi Karbon yang dihasilkan dari Penerbangan dengan parameter jumlah penumpang",
        },
        2: {
            title: "Shipping Carbon Emission Estimator",
            description:
                "Menghitung Perkiraan Emisi Karbon yang dihasilkan dari Pengiriman Barang berdasarkan berat beban yang dibawa",
        },
        3: {
            title: "Electricity Carbon Emission Estimator",
            description:
                "Menghitung Perkiraan Emisi Karbon yang dihasilkan dari Penggunaan Elektronik",
        },
        4: {
            title: "Vehicle Carbon Emission Estimator",
            description:
                "Menghitung Perkiraan Emisi Karbon yang dihasilkan dari Kendaraan",
        },
        5: {
            title: "Fuel Combustion Carbon Emission Estimator",
            description:
                "Menghitung Perkiraan Emisi Karbon yang dihasilkan dari Bahan Bakar",
        },
        6: {
            title: "Vehicle List Carbon Emission Estimator",
            description:
                "Menghitung Perkiraan Mobil yang ditemukan meningkatkan emisi Karbon",
        },
        
    };

    const detail = detailsData[id];

    return (
        <div className="page-container">
            <h1 className="page-title">{detail?.title || "Detail Not Found"}</h1>
            <div className="page-description-box">
                <p className="page-description">{detail?.description}</p>
            </div>
            <Link to="/" className="back-link">← Back to Home</Link>
        </div>
    );
};

export default Details;

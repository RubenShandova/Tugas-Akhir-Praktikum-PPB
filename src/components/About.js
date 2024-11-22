import React from "react";

const About = () => {
    return (
        <div className="about-container">
            <h1 className="about-title">Tentang Aplikasi</h1>
            <div className="about-content">
                {/* Kotak Deskripsi Aplikasi */}
                <div className="about-box">
                    <h2 className="about-subtitle">Deskripsi Aplikasi</h2>
                    <p className="about-description">
                        Ini merupakan aplikasi berbasis website untuk menghitung perkiraan emisi karbon yang dihasilkan dari berbagai aktivitas, 
                        seperti penerbangan (Flighting), pengiriman barang (Shipping), konsumsi listrik (Electricity), kendaraan (Vehicle), 
                        dan pembakaran bahan bakar (Fuel Combustion).
                    </p>
                </div>

                {/* Kotak Informasi Pembuat */}
                <div className="about-box">
                    <h2 className="about-subtitle">Informasi Pembuat Aplikasi</h2>
                    <ul className="bio-list">
                        <li>
                            <strong>Nama:</strong> Ruben Shandova S
                        </li>
                        <li>
                            <strong>Jurusan:</strong> Teknik Komputer
                        </li>
                        <li>
                            <strong>Perguruan Tinggi:</strong> Universitas Diponegoro
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default About;

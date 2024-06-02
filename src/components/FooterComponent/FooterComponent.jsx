import React from "react";
import './FooterComponent.css';
import logo from './../../assets/images/logo-fondo-negro.png';

function FooterComponent() {
    return (

    
        <footer className="footer" position="static" sx={{backgroundColor: '#e20001', height: '14vh'}}>
            <div className="footer-content">
                <h1 className="logo-footer" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <img src={logo} alt="Logo" className="image-footer" />
                </h1>
                <div className="footer-grid">
                    <div className="legalcy" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '90%'}}>
                        <p>© 2024 campusGo, Inc</p>
                    </div>
                    <div className="ubication" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '90%' }}>
                        <p>Cali - Colombia</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export { FooterComponent };

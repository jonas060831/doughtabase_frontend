import React from 'react';
import { useNavigate } from 'react-router-dom';
import './About.css';

const About = () => {
    const navigate = useNavigate();

    return (
        <div className="about-div">
            <header className="about-header">
                <h1>About DoughtaBase</h1>
                <p>An address book for bakers and their baking neighbors.</p>
            </header>
            <div className="about-content">
                <p>Discover what DoughtaBase offers:</p>
                <ul>
                    <li>Customize your bakery's info.</li>
                    <li>Find information about your neighboring bakeries.</li>
                    <li>Update your bakery's specialties with ease.</li>
                </ul>
            </div>
            <button
                className="about-back-button"
                onClick={() => navigate('/')}
            >
                Back to Home
            </button>
        </div>
    );
};

export default About;

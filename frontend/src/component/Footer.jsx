import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faTwitter, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';



const Footer = () => {
    return (
        <section className="bottom">
            <footer className="footer text-white text-center">
                <div className="container p-4">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 mb-4 mb-md-0 img">
                            <h5 className="text-uppercase">USMBA</h5><FontAwesomeIcon icon="fa-brands fa-linkedin" />
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6616.053423165313!2d-5.006858786976145!3d33.99184764722906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd9f8bbea38bd1cb%3A0x36c2d3aadd24868d!2sEcole%20Sup%C3%A9rieure%20de%20Technologie!5e0!3m2!1sfr!2sma!4v1656536988601!5m2!1sfr!2sma"
                                width="500"
                                height="300"
                                style={{ border: '0' }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>

                        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                            <h5>Réseaux sociaux</h5>
                            <br />
                            <ul className="list-unstyled mb-0">
                                <li>
                                    <a href="https://www.linkedin.com/company/usmba/?trk=public_profile_experience-item_profile-section-card_image-click&originalSubdomain=fr" className="text-white">
                                        <FontAwesomeIcon icon={faLinkedin} />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://twitter.com/usmbaofficiel?lang=fr" className="text-white">
                                    <FontAwesomeIcon icon={faTwitter} />                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.youtube.com/channel/UCV0UtgNHVk8XUr7zTJKrZFA" className="text-white">
                                    <FontAwesomeIcon icon={faYoutube} />                                    </a>
                                </li>
                                <li>
                                    <a href="https://fr-fr.facebook.com/usmba.ac.ma/" className="text-white">
                                    <FontAwesomeIcon icon={faFacebook} />                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                            <h5 className="text-uppercase mb-0">Site</h5>
                            <br />
                            <ul className="list-unstyled">
                                <li>
                                    <a href="" className="text-white">Login</a>
                                </li>
                                <li>
                                    <a href="" className="text-white">Register</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                    © 2023 usmba.com
                </div>
            </footer>
        </section>
    );
};

export default Footer;

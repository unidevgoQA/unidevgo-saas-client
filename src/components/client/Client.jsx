import React from "react";
import "swiper/css";
import clientLogo1 from "../../assets/client/client (1).avif";
import clientLogo2 from "../../assets/client/client (1).jpg";
import clientLogo3 from "../../assets/client/client (1).png";
import clientLogo4 from "../../assets/client/client (2).png";
import clientLogo5 from "../../assets/client/client (3).avif";
import clientLogo6 from "../../assets/client/client (3).png";
import clientLogo7 from "../../assets/client/client (4).png";
import "./client.css";

// Client logos
const clientLogos = [
  {
    id: 1,
    src: clientLogo1,
    alt: "logo",
  },
  {
    id: 2,
    src: clientLogo2,
    alt: "logo",
  },
  {
    id: 3,
    src: clientLogo3,
    alt: "logo",
  },
  {
    id: 4,
    src: clientLogo4,
    alt: "logo",
  },
  {
    id: 5,
    src: clientLogo5,
    alt: "logo",
  },
  {
    id: 6,
    src: clientLogo6,
    alt: "logo",
  },
  {
    id: 7,
    src: clientLogo7,
    alt: "logo",
  },

];
const Client = () => {
  return (
    <section className="client-section">
    <div className="container">
      <h3 className="client-section-title">
        Trusted by 225,000+ customers, from startups to enterprises
      </h3>
      <div className="logo-container">
        {clientLogos.map((logo) => (
          <div className="logo-item" key={logo.id}>
            <img src={logo.src} alt={logo.alt} className="client-logo" />
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default Client;

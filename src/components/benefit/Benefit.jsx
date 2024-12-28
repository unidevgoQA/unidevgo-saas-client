import React from 'react';
import { FaDatabase, FaRocket, FaShieldAlt, FaUsers } from "react-icons/fa";
import './benefit.css';


const benefits = [
    {
      id: 1,
      icon: <FaDatabase />,
      subtitle: "RELIABLE SCALABILITY",
      title: "Built for flexibility, speed, and scale",
      description:
        "mondayDB is our in-house data engine, enabling you to move fast, expand to more teams, and adapt to the most complex business workflows.",
    },
    {
      id: 2,
      icon: <FaShieldAlt />,
      subtitle: "360° DATA CONTROL",
      title: "Industry-leading data security",
      description:
        "Confidently manage data with custom granular permissions all in a secure environment, backed by industry-leading compliance standards.",
    },
    {
      id: 3,
      icon: <FaRocket />,
      subtitle: "RAPID IMPLEMENTATION",
      title: "Accelerate time to value from day one",
      description:
        "Gain instant value from the platform with our white glove services, from advanced onboarding and training to premium support.",
    },
    {
      id: 4,
      icon: <FaUsers />,
      subtitle: "DELIGHTFUL EXPERIENCE",
      title: "Intuitive adoption across the org",
      description:
        "Get teams on the same page with a platform they'll love so you can easily gain real-time, accurate visibility of your organization's OKRs and metrics.",
    },
  ];

const Benefit = () => {
  return (
    <div className="benefits-section">
    <div className="container">
      {/* Heading and Button */}
      <div className="d-flex justify-content-between align-items-center heading-container mb-5">
        <h2 className="section-title-benefit">
          61% of Fortune 500 enterprises scale their success with unidevGO
        </h2>
        <button className="btn btn-outline-light talk-to-sales-btn">
          Talk to Sales →
        </button>
      </div>

      {/* Benefit Cards */}
      <div className="row">
        {benefits.map((benefit) => (
          <div className="col-md-6 col-lg-3 mb-4" key={benefit.id}>
            <div className="benefit-card">
              <div className="benefit-icon">{benefit.icon}</div>
              <h5 className="benefit-subtitle">{benefit.subtitle}</h5>
              <h4 className="benefit-title">{benefit.title}</h4>
              <p className="benefit-description">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default Benefit
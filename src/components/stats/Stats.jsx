import React from "react";
import logo1 from "../../assets/client/client (1).avif";
import logo2 from "../../assets/client/client (1).jpg";
import logo3 from "../../assets/client/client (1).png";

import "./stats.css";

// Sample data for the section
const statsData = [
  {
    logo: logo1,
    statistic: "20%",
    description: "Increase in client satisfaction",
  },
  {
    logo: logo2,
    statistic: "3X",
    description: "Creative output",
  },
  {
    logo: logo3,
    statistic: "$4.14M",
    description: "Saved by process optimization",
  },
];

const Stats = () => {
  return (
    <div className="client-stats container">
      <div className="client-stats-wrapper">
        {statsData.map((item, index) => (
          <div className="client-stats-item" key={index}>
            <img src={item.logo} alt="Client Logo" className="client-logo" />
            <p className="description">{item.description}</p>
            <h2 className="statistic">{item.statistic}</h2>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;

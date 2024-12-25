import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import bannerImg from "../../assets/hero-section.avif";
import "./banner.css";
const Banner = () => {
  const options = [
    "Project management",
    "Task management",
    "Client projects",
    "Business operations",
    "Resource management",
    "Portfolio management",
    "Goals & strategy",
    "Requests & approvals",
  ];

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelect = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleGetStarted = () => {
    alert(`Selected options: ${selectedOptions.join(", ")}`);
  };

  return (
    <div className="banner p-3">
      <div className="heading container">
        <h2 className="text-center mb-4">Bring your strategy to life</h2>
        <h4 className="text-center mb-4">
          Gain the clarity and control you need to connect your everyday work to
          business goals across projects and processes.
        </h4>
      </div>
      <div className="features container my-5">
        <h3 className="text-center mb-4">What would you like to work on?</h3>
        <div className="row g-3">
          {options.map((option, index) => (
            <div className="col-6 col-md-3" key={index}>
              <div
                className={`option-card ${
                  selectedOptions.includes(option) ? "selected" : ""
                }`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </div>
            </div>
          ))}
        </div>
        <div className="banner-img text-center mt-4">
          <button className="btn-get-started" onClick={handleGetStarted}>
            Get Started <FaLongArrowAltRight />
          </button>
        </div>
      </div>
      <div className="image container mt-4">
        <img src={bannerImg} alt="banner-img" />
      </div>
    </div>
  );
};

export default Banner;

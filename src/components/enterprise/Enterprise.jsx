import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import enterpriseImg from "../../assets/enterprise/66f91530fb2ecb173ad6550d_image 626.avif";
import "./enterprise.css"; // Import your CSS for styling

const Enterprise = () => {
  return (
    <section className="enterprise-section">
      <div className="container">
        <div className="row align-items-center">
          {/* Text Content */}
          <div className="col-lg-6 col-md-12 text-content">
            <h1 className="heading">Enterprise-wide clarity</h1>
            <p className="description">
              Our experts will help you create a unified view of your
              organization, including scalable project management, efficient
              resource management, and alignment with your goals.
            </p>
            <button className="cta-button">Talk to sales <FaLongArrowAltRight/></button>
          </div>
        </div>
      </div>

      {/* Image Content outside the container */}
      <div className="image-wrapper">
        <img src={enterpriseImg} alt="Enterprise Clarity" className="responsive-image" />
      </div>
    </section>
  );
};

export default Enterprise;

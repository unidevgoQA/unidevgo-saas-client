import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import vid1 from '../../assets/feature/110224-card-vid-crm-v1.mp4';
import vid2 from '../../assets/feature/110224-card-vid-dev-v1.mp4';
import vid3 from '../../assets/feature/110224-card-vid-wm-v1.mp4';
import img1 from '../../assets/feature/feature (1).avif';
import img2 from '../../assets/feature/feature (1).png';
import img3 from '../../assets/feature/feature (2).png';
import img4 from '../../assets/feature/feature (3).png';

import "./feature.css";

const Feature = () => {
  const features = [
    {
      id: 1,
      img : img1,
      title: "unidevGO work management",
      text: "Manage projects & tasks",
      btnClass: "btn-primary",
      videoUrl: vid1,
      overlayColor: "rgba(103, 129, 235, 0.47)", //rgb(220, 122, 30) with transparency
    },
    {
      id: 2,
      img : img2,
      title: "unidevGO CRM",
      text: "Streamline sales processes",
      btnClass: "btn-success",
      videoUrl: vid2,
      overlayColor: "rgba(20, 16, 16, 0.55)", //rgb(220, 30, 55) with transparency
    },
    {
      id: 3,
      img : img3,
      title: "unidevGO dev",
      text: "Manage product development lifecycles",
      btnClass: "btn-info",
      videoUrl: vid3,
      overlayColor: "rgba(75, 75, 75, 0.57)", // #371EDC with transparency
    },
    {
      id: 4,
      img : img4,
      title: "unidevGO service",
      text: "Streamline ticketing & service operations",
      btnClass: "btn-danger",
      videoUrl: vid1, // Reusing vid1 as an example
      overlayColor: "rgba(36, 187, 74, 0.4)", //rgb(72, 122, 15) with transparency
    },
  ];

  return (
    <div className="feature-section">
    {/* Render feature cards in two rows */}
    {Array(2)
      .fill()
      .map((_, rowIndex) => (
        <div className="feature-row" key={rowIndex}>
          {features.slice(rowIndex * 2, rowIndex * 2 + 2).map((feature) => (
            <div
              key={feature.id}
              className="feature-card-video"
              style={{
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Background video */}
              <video
                className="feature-video"
                src={feature.videoUrl}
                autoPlay
                loop
                muted
                playsInline
              ></video>

              {/* Overlay */}
              <div
                className="overlay"
                style={{ backgroundColor: feature.overlayColor }}
              >
                <div className="feature-content">
                  <img src={feature.img} alt="feauture-img" />
                  <h5 className="feature-title">{feature.title}</h5>
                  <p className="feature-text">{feature.text}</p>
                  <div className="feature-buttons">
                    <button className="btn-get-started">
                      Get Started <FaLongArrowAltRight />
                    </button>
                    <button className="learn-more-btn">Learn More</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
  </div>
  );
};

export default Feature;

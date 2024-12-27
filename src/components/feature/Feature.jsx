import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import vid1 from '../../assets/feature/110224-card-vid-crm-v1.mp4';
import vid2 from '../../assets/feature/110224-card-vid-dev-v1.mp4';
import vid3 from '../../assets/feature/110224-card-vid-wm-v1.mp4';
import "./feature.css";

const Feature = () => {
  const features = [
    {
      id: 1,
      title: "unidevGO work management",
      text: "Manage projects & tasks",
      btnClass: "btn-primary",
      videoUrl: vid1,
      overlayColor: "rgba(10, 11, 14, 0.47)", // #371EDC with transparency
    },
    {
      id: 2,
      title: "unidevGO CRM",
      text: "Streamline sales processes",
      btnClass: "btn-success",
      videoUrl: vid2,
      overlayColor: "rgba(10, 11, 14, 0.47)", // #371EDC with transparency
    },
    {
      id: 3,
      title: "unidevGO dev",
      text: "Manage product development lifecycles",
      btnClass: "btn-info",
      videoUrl: vid3,
      overlayColor: "rgba(10, 11, 14, 0.47)", // #371EDC with transparency
    },
    {
      id: 4,
      title: "unidevGO service",
      text: "Streamline ticketing & service operations",
      btnClass: "btn-danger",
      videoUrl: vid1, // Reusing vid1 as an example
      overlayColor: "rgba(31, 102, 49, 0.4)", //rgba(254, 66, 3, 0.25) with transparency
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
                  <h5 className="feature-title">{feature.title}</h5>
                  <p className="feature-text">{feature.text}</p>
                  <div className="feature-buttons">
                    <button className="btn-get-started">
                      Get Started <FaLongArrowAltRight />
                    </button>
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

import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules"; // Correct import for Navigation module
import { Swiper, SwiperSlide } from "swiper/react";
import bannerImg from "../../assets/hero-section.avif";
import "./service.css";

// Slider data
const sliderData = [
  {
    id: 1,
    title: "Marketing",
    subtitle: "Work Management",
    image: bannerImg,
    overlayColor: "#371EDC",
    hoverContent: {
      title: "Recommended product",
      description: [
        "Campaign dashboard",
        "Ad status tracking",
        "Performance insights",
      ],
      buttonText: "Get Started",
    },
  },
  {
    id: 2,
    title: "Projects & Tasks",
    subtitle: "Work Management",
    image: bannerImg,
    overlayColor: "#777EFF",
    hoverContent: {
      title: "Recommended product",
      description: [
        "Team planning tools",
        "Task tracking",
        "Automated workflows",
      ],
      buttonText: "Get Started",
    },
  },
  {
    id: 3,
    title: "Sales & CRM",
    subtitle: "CRM",
    image: bannerImg,
    overlayColor: "#F8F0FB",
    hoverContent: {
      title: "Recommended product",
      description: [
        "Sales pipeline",
        "Lead management",
        "Mass email & tracking",
      ],
      buttonText: "Get Started",
    },
  },
  {
    id: 4,
    title: "IT & Support",
    subtitle: "Service",
    image: bannerImg,
    overlayColor: "#FE4203",
    hoverContent: {
      title: "Recommended product",
      description: [
        "IT ticketing system",
        "Incident management",
        "Resource allocation",
      ],
      buttonText: "Get Started",
    },
  },
  {
    id: 5,
    title: "Operations",
    subtitle: "Work Management",
    image: bannerImg,
    overlayColor: "#F8FF6F",
    hoverContent: {
      title: "Recommended product",
      description: [
        "Procurement overview",
        "Supply chain management",
        "Operational efficiency",
      ],
      buttonText: "Get Started",
    },
  },
  {
    id: 6,
    title: "Creative & Design",
    subtitle: "Work Management",
    image: bannerImg,
    overlayColor: "#7CEB7E",
    hoverContent: {
      title: "Recommended product",
      description: [
        "Creative asset management",
        "Design collaboration",
        "Visual project tracking",
      ],
      buttonText: "Get Started",
    },
  },
  {
    id: 7,
    title: "HR & Recruitment",
    subtitle: "HR Management",
    image: bannerImg,
    overlayColor: "#00E600",
    hoverContent: {
      title: "Recommended product",
      description: [
        "Employee onboarding",
        "Recruitment pipeline",
        "Team performance tracking",
      ],
      buttonText: "Get Started",
    },
  },
];

const Service = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="slider-section">
      <h2 className="section-title">What would you like to manage?</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={5}
        navigation
        modules={[Navigation]} // Pass Navigation module
      >
        {sliderData.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className="slider-card"
              style={{
                backgroundImage: `url(${item.image})`,
              }}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className="card-overlay"
                style={{
                  backgroundColor: `${item.overlayColor}`,
                  opacity: hoveredCard === item.id ? 0.9 : 0.5,
                }}
              ></div>
              {hoveredCard === item.id ? (
                <div className="card-hover-content">
                  <h3>{item.hoverContent.title}</h3>
                  <ul>
                    {item.hoverContent.description.map((desc, index) => (
                      <li key={index}>{desc}</li>
                    ))}
                  </ul>
                  <button className="hover-button">
                    {item.hoverContent.buttonText} <FaLongArrowAltRight/>
                  </button>
                </div>
              ) : (
                <div className="card-default-content">
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Service;

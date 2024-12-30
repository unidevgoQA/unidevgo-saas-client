import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { LuHeartPulse, LuMonitor, LuRocket, LuSettings, LuUsers } from "react-icons/lu";
import logo1 from "../../assets/client/client (1).avif";
import "./apart.css";
// Data for the cards
// Data for the cards
const cardData = [
  {
    id: 1,
    icon: LuHeartPulse, // Replace with actual icons or SVGs
    title: "High adoption",
    subtitle: "When teams love it, data flows",
    hoverContent: {
      description:
        "Customize automations, reports, and processes to your needs without compromising on governance and control.",
      logo: logo1,
      footer:
        "unidevgo supports over 200 use cases in 190 different industries",
    },
  },
  {
    id: 2,
    icon: LuRocket, // Replace with actual icons or SVGs
    title: "Speed to value",
    subtitle: "Experience instant business impact",
    hoverContent: {
      description:
        "Deliver faster ROI with easy-to-use tools tailored to your unique workflows and business needs.",
      logo: logo1,
      footer: "unidevgo accelerates workflows for diverse teams globally",
    },
  },
  {
    id: 3,
    icon: LuSettings, // Replace with actual icons or SVGs
    title: "Freedom to customize",
    subtitle: "Where flexibility meets standardization",
    hoverContent: {
      description:
        "Flexibly design workflows that adapt to evolving needs while maintaining organizational standards.",
      logo: logo1,
      footer: "unidevgo offers unmatched customization for teams.",
    },
  },
  {
    id: 4,
    icon: LuMonitor, // Replace with actual icons or SVGs
    title: "Seamless Integration",
    subtitle: "Connect your favorite tools effortlessly",
    hoverContent: {
      description:
        "Integrate with hundreds of tools and platforms to centralize data and streamline workflows.",
      logo: logo1,
      footer: "unidevgo integrates with over 300 apps and tools.",
    },
  },
  {
    id: 5,
    icon: LuUsers, // Replace with actual icons or SVGs
    title: "Team Collaboration",
    subtitle: "Enhance teamwork and productivity",
    hoverContent: {
      description:
        "Boost team collaboration with features designed to improve communication and project tracking.",
      logo: logo1,
      footer: "unidevgo fosters collaboration for teams of any size.",
    },
  },
];

const Apart = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  return (
    <div className="apart">
      <div className="heading container">
        <h2 className="text-center text-black mb-4 pt-5">What sets us apart</h2>
      </div>
      <div className="hover-cards container">
        <div className="cards-wrapper">
          {cardData.map((card) => (
            <div
              key={card.id}
              className={`card ${hoveredCard === card.id ? "hovered" : ""}`}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {hoveredCard === card.id ? (
                // Hover content
                <div className="hover-content">
                  <p>{card.hoverContent.description}</p>
                  <img
                    src={card.hoverContent.logo}
                    alt="Logo"
                    className="hover-logo"
                  />
                  <p className="hover-footer">{card.hoverContent.footer}</p>
                </div>
              ) : (
                // Default content
                <div className="default-content">
                  <span
                    style={{
                      fontSize: "60px",
                      color : "#fff"
                    }}
                    className="icon"
                  >
                    {<card.icon />}
                  </span>
                  <h2 className="my-4">{card.title}</h2>
                  <p>{card.subtitle}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <button className="btn-get-started mt-5">
          Get Started <FaLongArrowAltRight />
        </button>
      </div>
    </div>
  );
};

export default Apart;

import React, { useState } from "react";
import img1 from "../../assets/partner/partner-img (1).avif";
import img2 from "../../assets/partner/partner-img (2).avif";
import img3 from "../../assets/partner/partner-img (3).avif";
import "./partner.css";
// Accordion data with real images
const accordionData = [
  {
    id: 1,
    title: "Identify risks across your portfolio",
    description:
      "Proactively raise flags across projects to help you address them.",
    image: img1,
  },
  {
    id: 2,
    title: "Categorize project requests at scale",
    description:
      "Analyze incoming requests, assign labels, and streamline your workflow.",
    image: img2,
  },
  {
    id: 3,
    title: "Instantly create a detailed project plan",
    description:
      "Automatically generate project plans with timelines and dependencies.",
    image: img3,
  },
];

const Partner = () => {
  const [activeId, setActiveId] = useState(1); // Default active item

  const handleItemClick = (id) => {
    setActiveId(id);
  };

  const activeItem = accordionData.find((item) => item.id === activeId);
  return (
    <div className="partner container">
      <div className="accordion-section">
        <div className="accordion-content">
          <h1 className="section-title">Your AI business partner</h1>
          <div className="accordion-items">
            {accordionData.map((item) => (
              <div
                key={item.id}
                className={`accordion-item ${
                  activeId === item.id ? "active" : ""
                }`}
                onClick={() => handleItemClick(item.id)}
              >
                <h3 className="accordion-title">{item.title}</h3>
                {activeId === item.id && (
                  <p className="accordion-description">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Render only the active item's image */}
        <div className="accordion-image">
          <img
            src={activeItem.image}
            alt={activeItem.title}
            className="accordion-img"
          />
        </div>
      </div>
    </div>
  );
};

export default Partner;

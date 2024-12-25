import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import img2 from "../../assets/project/66f9ae299382462fb2e38167_WM-A-Z-Goals & Okrs.avif";
import img1 from "../../assets/project/66f9ae29beecda0cc740c0b0_WM-A-Z-Projects.avif";
import img3 from "../../assets/project/66f9ae2c49279bcda2079e87_WM-A-Z-Portfolio.avif";
import img4 from "../../assets/project/66fa714bfd37f53b0dfd20a3_WM-A-Z-Resource management-v2.avif";
import "./project.css";

// Data for tabs
const tabsData = [
  {
    label: "Projects",
    title: "Project Management",
    subtitle: "Stay in sync and on schedule",
    description:
      "Deliver projects efficiently and coordinate dependencies with advanced capabilities teams love to use.",
    image: img1,
  },
  {
    label: "Goals & OKRs",
    title: "Goal Setting & OKRs",
    subtitle: "Align teams with strategy",
    description:
      "Track progress towards your strategic objectives for better alignment and productivity.",
    image: img2,
  },
  {
    label: "Portfolio",
    title: "Portfolio Management",
    subtitle: "Organize your projects",
    description:
      "Keep track of all your projects and portfolios in one place for better insights and decisions.",
    image: img3,
  },
  {
    label: "Resources",
    title: "Resource Management",
    subtitle: "Utilize resources effectively",
    description:
      "Optimize your resource allocation to ensure teams have what they need to succeed.",
    image: img4,
  },
];

const Project = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Handle tab change
  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className="project">
      {/* Page heading */}
      <div className="heading container">
        <h2 className="text-center mb-4">
          From projects to goals, <br />
          power work at every level
        </h2>
      </div>

      <div className="custom-tabs-container container">
        {/* Tabs Header */}
        <div className="tabs-header">
          <Tabs
            value={activeTab}
            onChange={handleChange}
            centered
            TabIndicatorProps={{
              style: { backgroundColor: "#fff" },
            }}
            sx={{
              "& .MuiTab-root": {
                color: "rgba(255, 255, 255, 0.7)", // Slightly transparent white for unselected tabs
                fontSize: "1.1rem",
                textTransform: "none",
                fontWeight: "500",
                fontFamily: '"Poppins", serif',
              },
              "& .Mui-selected": {
                color: "#fff", // Solid white color for selected tab
              },
            }}
          >
            {tabsData.map((tab, index) => (
              <Tab key={index} label={tab.label} />
            ))}
          </Tabs>
        </div>

        {/* Tabs Content */}
        <div className="tabs-content">
          {tabsData.map((tab, index) => (
            <div
              key={index}
              className={`tab-panel ${activeTab === index ? "active" : ""}`}
            >
              <div className="tabs-content-img-wrapper">
                {/* Text Content */}
                <div className="title-wrapper">
                  <h4>{tab.title}</h4>
                  <h1>{tab.subtitle}</h1>
                  <p>{tab.description}</p>
                  <button className="btn-get-white">
                    Get Started <FaLongArrowAltRight />
                  </button>
                </div>
                {/* Image Content */}
                <img src={tab.image} alt={tab.title} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;

import React from "react";
import Banner from "../../components/banner/Banner";
import Project from "../../components/projects/Project";
import Stats from "../../components/stats/Stats";

const Home = () => {
  return (
    <>
      <Banner />
      <Stats/>
      <Project/>
    </>
  );
};

export default Home;

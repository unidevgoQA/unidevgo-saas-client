import React from "react";
import Apart from "../../components/apart/Apart";
import Banner from "../../components/banner/Banner";
import Partner from "../../components/partner/Partner";
import Project from "../../components/projects/Project";
import Stats from "../../components/stats/Stats";

const Home = () => {
  return (
    <>
      <Banner />
      <Stats/>
      <Project/>
      <Partner/>
      <Apart/>
    </>
  );
};

export default Home;

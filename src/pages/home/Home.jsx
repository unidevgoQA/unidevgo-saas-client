import React from "react";
import Apart from "../../components/apart/Apart";
import Banner from "../../components/banner/Banner";
import Benefit from "../../components/benefit/Benefit";
import Client from "../../components/client/Client";
import Enterprise from "../../components/enterprise/Enterprise";
import Feature from "../../components/feature/Feature";
import Footer from "../../components/footer/Footer";
import Partner from "../../components/partner/Partner";
import Project from "../../components/projects/Project";
import Service from "../../components/service/Service";
import Stats from "../../components/stats/Stats";

const Home = () => {
  return (
    <>
      <Banner />
      <Service/>
      <Stats/>
      <Project/>
      <Partner/>
      <Benefit/>
      <Apart/>
      <Feature/>
      <Client/>
      <Enterprise/>
      <Footer/>
    </>
  );
};

export default Home;

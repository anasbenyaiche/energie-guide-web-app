import React from "react";
import Footer from "../layout/Footer/Footer";
import MainQuestion from "../components/HomeQuestion/MainQuestion";
import IconCards from "../components/MainCards/IconCards";
import SearchHome from "../components/SearchArticleHome/SearchHome";
import CardList from "../components/MainCard/CardList";

const Home = () => {
  return (
    <>
      <SearchHome />
      <CardList title='Processus de développement des projets d’énergies renouvelables' />
      <IconCards />
      <MainQuestion />
    </>
  );
};

export default Home;

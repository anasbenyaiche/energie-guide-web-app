// eslint-disable-next-line no-unused-vars
import React from "react";
import Layout from "../layout/layout";
import Footer from "../layout/Footer/Footer";
import LinkList from "./LinkList/LinkList";
import { MAIN_PAGE_LINKS } from "../constants/MainPageLinks";
const Home = () => {
  return (
    <>
      <Layout>
        <div className="nav-home-container">
          <div className="nav-home-image">
            <img src="src\assets\energie.png" alt="" />
          </div>
          <LinkList
            data={MAIN_PAGE_LINKS}
            title={
              "  PROJETS D’ÉNERGIE RENOUVELABLE EN TUNISIE : Guide Détaillé"
            }
          />
        </div>
      </Layout>
      <Footer />
    </>
  );
};

export default Home;

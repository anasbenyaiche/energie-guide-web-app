import React from "react";
import Layout from "../layout/layout";
import Footer from "../layout/Footer/Footer";
import LinkList from "./LinkList/LinkList";
import { MAIN_PAGE_LINKS } from "../constants/MainPageLinks";
import AdminSidebar from "../layout/AdminSidebar/AdminSidebar";

const Home = () => {
  return (
    <div>
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
    </div>
  );
};

export default Home;

import React from "react";
import Layout from "../layout/layout";
import Footer from "../layout/Footer/Footer";
import LinkList from "./LinkList/LinkList";
import { MAIN_PAGE_LINKS } from "../constants/MainPageLinks";
import AdminSidebar from "../layout/AdminSidebar/AdminSidebar";
import CardList from "../components/MainCard/CardList";
import HeadSection from "../components/HeadSection/HeadSection";
import MainQuestion from "../components/HomeQuestion/MainQuestion";
import IconCards from "../components/MainCards/IconCards";
import TitleSection from "../components/TitleSection/TitleSection";
import FAQPage from "../Pages/FAQPage";
import SubTitleSection from "../components/SubTitleSection/SubTitleSection";
import Tab from "../components/StepperTab/Tab/Tab";

const Home = () => {
  return (
    <div>
      <Layout>
        <div className="nav-home-container">
          <div className="nav-home-image">
            <img src="src\assets\energie.png" alt="" />
          </div>
        </div>
        <CardList title="Processus de développement des projets d’énergies renouvelables" />
        <IconCards />
        <HeadSection />
        <FAQPage />
        <TitleSection />
        <SubTitleSection />
        <Tab />
      </Layout>
      <Footer />
    </div>
  );
};

export default Home;

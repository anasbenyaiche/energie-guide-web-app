import React, { useContext, useEffect, useState, useMemo } from "react";
import Layout from "../layout/layout";
import Footer from "../layout/Footer/Footer";
import api from "../api/api";
import { useMatch } from "react-router-dom";
import { ContentBlockContainer } from "./ContentBlockContainer";
import PagesContext from "../context/PageContext";

const AppContainer = () => {
  const [pageData, setPageData] = useState(null);
  const { pages } = useContext(PagesContext);
  const { pathname } = useMatch(":link");

  const pageId = useMemo(() => {
    return pages?.find(({ slug }) => slug === pathname)?._id;
  }, [pages, pathname]);

  useEffect(() => {
    const fetchPageData = async () => {
      if (pageId) {
        try {
          const response = await api.get(`/pages/${pageId}`);
          setPageData(response.data);
        } catch (error) {
          console.error("Error fetching page data:", error);
        }
      }
    };

    fetchPageData();
  }, [pageId]);

  return (
    <>
      <Layout>
        {pageData ? (
          <ContentBlockContainer
            contentBlocks={pageData.contentBlocks}
            title={pageData.page.title}
          />
        ) : (
          <p>Loading page content...</p>
        )}
      </Layout>
      <Footer />
    </>
  );
};

export default AppContainer;

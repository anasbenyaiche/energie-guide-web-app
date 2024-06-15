import React, { useContext, useMemo } from "react";
import Layout from "../layout/layout";
import Footer from "../layout/Footer/Footer";
import { useMatch } from "react-router-dom";
import PagesContext from "../context/PageContext";
import PreviewPages from "../components/PreviewBlock/PreviewPages";
import useFetchPageData from "../hooks/useFetchPageData";

const AppContainer = () => {
  const { pages } = useContext(PagesContext);
  const { pathname } = useMatch(":link");

  const pageId = useMemo(() => {
    return pages?.find(({ slug }) => slug === pathname)?._id;
  }, [pages, pathname]);

  console.log(pageId)

  const { pageData, loading, error } = useFetchPageData(pageId)
  if (loading) {
    return <p className="text-black">Loading page content...</p>;
  }

  if (error) {
    return <p>Error fetching page data: {error.message}</p>;
  }

  return (
    <>
      <Layout>
        {pageData ? (
          <>
            {pageData.contentBlocks.map((item) => (
              <PreviewPages key={item._id} blocks={item} />
            ))}
          </>
        ) : (
          <p>Loading page content...</p>
        )}
      </Layout>
      <Footer />
    </>
  );
};

export default AppContainer;

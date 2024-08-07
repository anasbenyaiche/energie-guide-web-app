import React, { useContext, useMemo } from "react";
import { useMatch } from "react-router-dom";
import PagesContext from "../context/PageContext";
import PreviewPages from "../components/PreviewBlock/PreviewPages";
import useFetchPageData from "../hooks/useFetchPageData";
import MenuPage from "../components/MenuPages/MenuPage";
import Loader from "../utils/Loader/Loader";

const AppContainer = () => {
  const { pages } = useContext(PagesContext);
  const { pathname } = useMatch(":link");

  const pageId = useMemo(() => {
    return pages?.find(({ slug }) => slug === pathname)?._id;
  }, [pages, pathname]);

  const { pageData, loading, error } = useFetchPageData(pageId)



  if (loading) {
    return <Loader />
  }

  if (error) {
    return <p>Error fetching page data: {error.message}</p>;
  }

  return (
    <>
      <MenuPage />
      {pageData ? (
        <div className="row">

          {pageData.contentBlocks.map((item) => (
            <PreviewPages key={item._id} blocks={item} />
          ))}
        </div>
      ) : (
        <Loader />
      )}

    </>
  );
};

export default AppContainer;

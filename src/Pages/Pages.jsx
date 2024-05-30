import Layout from "../layout/layout";
import PagesList from "../containers/PageList";
import Footer from "../layout/Footer/Footer";

const Pages = () => {
  return (
    <div>
      <Layout>
        <PagesList />
      </Layout>
      <Footer />
    </div>
  );
};

export default Pages;

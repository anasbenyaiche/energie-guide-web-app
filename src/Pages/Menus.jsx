import Layout from "../layout/layout";
import Footer from "../layout/Footer/Footer";
import MenuList from "../containers/MenuList";

const Menus = () => {
  return (
    <div>
      <Layout>
        <MenuList />
      </Layout>
      <Footer />
    </div>
  );
};

export default Menus;

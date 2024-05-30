import Layout from "../layout/layout";
import Footer from "../layout/Footer/Footer";
import MenuItemsList from "../containers/MenuItemList";

const MenuItems = () => {
  return (
    <div>
      <Layout>
        <MenuItemsList />
      </Layout>
      <Footer />
    </div>
  );
};

export default MenuItems;

import Layout from "../layout/layout";
import Footer from "../layout/Footer/Footer";
import DashboardContainer from "../containers/DashboardContainer";

const Dashboard = () => {
  return (
    <div>
      <Layout>
        <DashboardContainer />
      </Layout>
      <Footer />
    </div>
  );
};

export default Dashboard;

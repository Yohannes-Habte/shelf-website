import { useState } from "react";
import "./AdminDashboardPage.scss";
import DashboardSummary from "../../../components/admin/dashboardSummary/DashboardSummary";
import AdminSidebar from "../../../components/admin/adminSidebar/AdminSidebar";

const AdminDashboardPage = () => {
  const [isActive, setIsActive] = useState(1);
  return (
    <main className="admin-dashboard-page">
      <section className="admin-dashboard-page-container">
        <h1 className="admin-dashboard-page-title"> Admin Dashboard page </h1>

        <div className="admin-content-wrapper">
          <div className="sidebar">
            <AdminSidebar isActive={isActive} setIsActive={setIsActive} />
          </div>

          <div className="main">
            <DashboardSummary isActive={isActive} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminDashboardPage;

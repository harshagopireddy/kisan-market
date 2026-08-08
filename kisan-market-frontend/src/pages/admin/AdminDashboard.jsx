import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import AdminService from "../../services/AdminService";
import { getUser } from "../../utils/auth";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const user = getUser();

  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
  });

  const loadStats = useCallback(() => {
    AdminService.getStats()
      .then((response) => {
        setStats(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const logout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>👨‍💼 Admin Dashboard</h1>

        <h2>Welcome {user?.name}</h2>

        <p>Manage the Kisan Market platform.</p>

        <div className="stats-container">
          <div className="stat-card">
            <h3>👥</h3>
            <h2>{stats.users}</h2>
            <p>Total Users</p>
          </div>

          <div className="stat-card">
            <h3>🌾</h3>
            <h2>{stats.products}</h2>
            <p>Total Products</p>
          </div>

          <div className="stat-card">
            <h3>📦</h3>
            <h2>{stats.orders}</h2>
            <p>Total Orders</p>
          </div>
        </div>

        <button onClick={() => navigate("/manage-users")}>
          👥 Manage Users
        </button>

        <button onClick={() => navigate("/manage-products")}>
          🌾 Manage Products
        </button>

        <button onClick={() => navigate("/manage-orders")}>
          📦 Manage Orders
        </button>

        <button className="logout-btn" onClick={logout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;

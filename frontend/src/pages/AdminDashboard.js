import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [users, setUsers] = useState(0);
  const [stores, setStores] = useState(0);
  const [ratings, setRatings] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/total-users")
      .then((res) => setUsers(res.data.total_users));

    axios
      .get("http://localhost:5000/api/admin/total-stores")
      .then((res) => setStores(res.data.total_stores));

    axios
      .get("http://localhost:5000/api/admin/total-ratings")
      .then((res) => setRatings(res.data.total_ratings));
  }, []);

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
      </div>

      <div className="admin-cards">
        <div className="admin-card">
          <h2>Total Users</h2>
          <div className="admin-number">{users}</div>
        </div>

        <div className="admin-card">
          <h2>Total Stores</h2>
          <div className="admin-number">{stores}</div>
        </div>

        <div className="admin-card">
          <h2>Total Ratings</h2>
          <div className="admin-number">{ratings}</div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Fetch users from the backend
  const fetchUsers = async () => {
    const token = Cookies.get("token");

    if (!token) {
      navigate("/signin");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/user/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle user activation/deactivation
  const handleStatusChange = async (userId, newStatus) => {
    const token = Cookies.get("token");

    try {
      await axios.patch(
        `http://localhost:5000/api/user/${userId}/${newStatus}`, 
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(`User ${newStatus} successfully`);
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error(`Error ${newStatus} user:`, error);
      alert(`Failed to ${newStatus} user`);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Admin Dashboard</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={`badge ${
                      user.status === "active" ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td>
                  {user.status === "active" ? (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleStatusChange(user._id, "deactivate")}
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleStatusChange(user._id, "activate")}
                    >
                      Activate
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );  
}

export default AdminDashboard;

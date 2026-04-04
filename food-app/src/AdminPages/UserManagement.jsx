import React, { useEffect, useState } from 'react';
import { FaTrash, FaSearch, FaCheckCircle, FaTimesCircle, FaUser } from 'react-icons/fa';
import { adminDeleteUser, getAllUsers } from '../api/JsonServerApi';
import toast from 'react-hot-toast';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.accountStatus && user.accountStatus.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  let handleDelete = async (userId) => {
    let response = await adminDeleteUser(userId);
    console.log(response.data);
    toast.success("User deleted successfully");
    fetchUsers();
  }

  if (loading) return <div className="loading-state">Loading User Database...</div>;

  return (
    <div className="user-management-wrapper">
      <div className="page-header">
        <h1 className="page-title">User Management</h1>
        <div className="search-bar-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by email or status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="user-table-card">
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User Details</th>
              <th>Contact</th>
              <th>Verification</th>
              <th>Account Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>#{user.id}</td>
                  <td className="user-info-cell">
                    <div className="user-avatar">
                      {user.name ? user.name.charAt(0) : <FaUser size={12} />}
                    </div>
                    <div className="user-text">
                      <p className="user-name">{user.name || "Unknown User"}</p>
                      <p className="user-email">{user.email}</p>
                    </div>
                  </td>
                  <td>{user.contact}</td>
                  <td>
                    {user.verified ? (
                      <span className="verify-badge verified">
                        <FaCheckCircle /> Verified
                      </span>
                    ) : (
                      <span className="verify-badge unverified">
                        <FaTimesCircle /> Pending
                      </span>
                    )}
                  </td>
                  <td>
                    <span className={`status-pill ${user.accountStatus?.toLowerCase()}`}>
                      {user.accountStatus}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button onClick={() => handleDelete(user.id)} className="action-btn delete" title="Delete User">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">No matching users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
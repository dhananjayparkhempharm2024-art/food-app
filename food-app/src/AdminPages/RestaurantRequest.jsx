import React, { useEffect, useState, useCallback } from 'react';
import { FaCheck, FaTimes, FaUtensils, FaMapMarkerAlt, FaEnvelope, FaExclamationTriangle, FaRedo } from 'react-icons/fa';
import { getPendingRestaurants, approveRestaurant, rejectRestaurant } from '../api/JsonServerApi';
import toast from 'react-hot-toast';

const RestaurantRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Track server failures

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getPendingRestaurants();
      
      // Handle cases where response exists but data might be empty or null
      if (response && response.data) {
        setRequests(response.data.data || []);
      } else {
        throw new Error("Empty response from server");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      // Differentiate between "Server Down" and "API Error"
      const message = err.code === "ERR_NETWORK" 
        ? "Server is offline. Please check if Spring Boot is running." 
        : (err.response?.data?.message || "Could not load requests.");
      
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const ActionHandler = async (id, action) => {
    try {
      if (action === 'approve') {
        await approveRestaurant(id);
        toast.success("Restaurant Approved!");
      } else {
        await rejectRestaurant(id);
        toast.error("Application Rejected");
      }
      fetchRequests(); 
    } catch (err) {
      const errMsg = err.response?.data?.message || "Action failed. Check connection.";
      toast.error(errMsg);
    }
  };

  // 1. LOADING STATE
  if (loading) return (
    <div className="status-container">
      <div className="spinner"></div>
      <p>Connecting to FoodExpress Server...</p>
    </div>
  );

  // 2. ERROR STATE (Server Down or 500)
  if (error) return (
    <div className="status-container error-state">
      <FaExclamationTriangle size={50} color="#e53e3e" />
      <h2>Connection Failed</h2>
      <p>{error}</p>
      <button className="retry-btn" onClick={fetchRequests}>
        <FaRedo /> Try Again
      </button>
    </div>
  );

  // 3. MAIN UI
  return (
    <div className="requests-container">
      <header className="page-header">
        <h1>New Restaurant Requests</h1>
        <p>Review and verify partner applications</p>
      </header>

      <div className="requests-grid">
        {requests.length > 0 ? (
          requests.map((req) => (
            <div key={req.id} className="request-card">
              <div className="card-top">
                <FaUtensils className="rest-icon" />
                <div className="title-group">
                  <h3>{req.restaurantName || "Unnamed Restaurant"}</h3>
                  <span className="cuisine-tag">{req.cuisineType || "General"}</span>
                </div>
              </div>
              
              <div className="card-body">
                <p><FaMapMarkerAlt /> {req.address || "No Address"}</p>
                <p><FaEnvelope /> {req.email}</p>
                <div className="description-box">
                  <small>Business Description:</small>
                  <p>{req.description || "The owner did not provide a description."}</p>
                </div>
              </div>

              <div className="card-actions">
                <button className="btn approve" onClick={() => ActionHandler(req.id, 'approve')}>
                  <FaCheck /> Approve
                </button>
                <button className="btn reject" onClick={() => ActionHandler(req.id, 'reject')}>
                  <FaTimes /> Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <FaUtensils size={40} style={{opacity: 0.2, marginBottom: '10px'}} />
            <p>No pending applications at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantRequests;
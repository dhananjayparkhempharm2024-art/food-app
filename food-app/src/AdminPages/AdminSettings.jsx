import React, { useEffect, useState } from 'react';
import { FaCog, FaUserShield, FaSave, FaTools, FaTruckLoading, FaShieldAlt } from 'react-icons/fa';
import { getSystemSettings, updateSystemSettings } from '../api/JsonServerApi'; 
import toast from 'react-hot-toast';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteName: "FoodExpress",
    maintenanceMode: false,
    baseDeliveryFee: 0,
    minOrderValue: 0,
    adminEmail: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await getSystemSettings();
        setSettings(response.data.data);
      } catch (error) {
        console.error("Settings load failed:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateSystemSettings(settings);
      toast.success("System configurations updated!");
    } catch (error) {
      toast.error("Failed to save settings.");
    }
  };

  if (loading) return <div className="loading">Initializing System Settings...</div>;

  return (
    <div className="settings-wrapper">
      <header className="page-header">
        <div className="title-section">
          <FaCog className="header-icon spin" />
          <h1>System Settings</h1>
        </div>
      </header>

      <form className="settings-form" onSubmit={handleSave}>
        {/* Section 1: General Configuration */}
        <div className="settings-card">
          <div className="card-header">
            <FaTools /> <h3>General Configuration</h3>
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>Platform Name</label>
              <input type="text" name="siteName" value={settings.siteName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Admin Support Email</label>
              <input type="email" name="adminEmail" value={settings.adminEmail} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Section 2: Operational Settings */}
        <div className="settings-card">
          <div className="card-header">
            <FaTruckLoading /> <h3>Operational Logistics</h3>
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>Base Delivery Fee (₹)</label>
              <input type="number" name="baseDeliveryFee" value={settings.baseDeliveryFee} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Minimum Order Value (₹)</label>
              <input type="number" name="minOrderValue" value={settings.minOrderValue} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Section 3: System Security & Status */}
        <div className="settings-card">
          <div className="card-header">
            <FaShieldAlt /> <h3>Security & Maintenance</h3>
          </div>
          <div className="status-toggle-box">
            <div className="toggle-text">
              <h4>Maintenance Mode</h4>
              <p>Disable all customer orders and show a "Under Maintenance" screen.</p>
            </div>
            <label className="switch">
              <input type="checkbox" name="maintenanceMode" checked={settings.maintenanceMode} onChange={handleChange} />
              <span className="slider round"></span>
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="save-settings-btn">
            <FaSave /> Save All Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
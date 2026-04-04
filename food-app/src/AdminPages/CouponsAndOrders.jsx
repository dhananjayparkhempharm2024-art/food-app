import React, { useEffect, useState } from 'react';
import { FaTag, FaPlus, FaTrash, FaCalendarAlt, FaTicketAlt } from 'react-icons/fa';
import { getCoupons, createCoupon, deleteCoupon } from '../api/JsonServerApi'; 
import toast from 'react-hot-toast';

const CouponsAndOffers = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discountType: "PERCENTAGE",
    discountValue: "",
    minOrderAmount: "",
    expiryDate: ""
  });

  const fetchCoupons = async () => {
    try {
      const response = await getCoupons();
      setCoupons(response.data.data || []);
    } catch (error) {
      toast.error("Failed to fetch coupons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleInputChange = (e) => {
    setNewCoupon({ ...newCoupon, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCoupon(newCoupon);
      toast.success("Coupon created successfully!");
      setShowForm(false);
      setNewCoupon({ code: "", discountType: "PERCENTAGE", discountValue: "", minOrderAmount: "", expiryDate: "" });
      fetchCoupons();
    } catch (error) {
      toast.error(error.response?.data?.message || "Creation failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this offer?")) return;
    try {
      await deleteCoupon(id);
      toast.success("Offer removed");
      fetchCoupons();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  if (loading) return <div className="loading">Loading Offers...</div>;

  return (
    <div className="coupons-wrapper">
      <header className="page-header">
        <div className="title-section">
          <FaTag className="header-icon" />
          <h1>Coupons & Offers</h1>
        </div>
        <button className="add-coupon-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close Form" : <><FaPlus /> Create New Coupon</>}
        </button>
      </header>

      {showForm && (
        <form className="coupon-form card-animation" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Coupon Code</label>
              <input type="text" name="code" placeholder="E.g. WELCOME50" required value={newCoupon.code} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Type</label>
              <select name="discountType" value={newCoupon.discountType} onChange={handleInputChange}>
                <option value="PERCENTAGE">Percentage (%)</option>
                <option value="FLAT">Flat Amount (₹)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Value</label>
              <input type="number" name="discountValue" placeholder="10" required value={newCoupon.discountValue} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Min. Order (₹)</label>
              <input type="number" name="minOrderAmount" placeholder="200" value={newCoupon.minOrderAmount} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Expiry Date</label>
              <input type="date" name="expiryDate" required value={newCoupon.expiryDate} onChange={handleInputChange} />
            </div>
          </div>
          <button type="submit" className="submit-coupon-btn">Save Offer</button>
        </form>
      )}

      <div className="coupons-grid">
        {coupons.length > 0 ? (
          coupons.map((coupon) => (
            <div key={coupon.id} className="coupon-card">
              <div className="coupon-top">
                <FaTicketAlt className="ticket-icon" />
                <span className="coupon-code-text">{coupon.code}</span>
                <button className="delete-coupon-btn" onClick={() => handleDelete(coupon.id)}>
                  <FaTrash />
                </button>
              </div>
              <div className="coupon-details">
                <h3>{coupon.discountType === "PERCENTAGE" ? `${coupon.discountValue}% OFF` : `₹${coupon.discountValue} OFF`}</h3>
                <p>Min. Order: ₹{coupon.minOrderAmount || '0'}</p>
                <div className="expiry-box">
                  <FaCalendarAlt /> Expires: {new Date(coupon.expiryDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-coupons">No active offers found. Create one to get started!</div>
        )}
      </div>
    </div>
  );
};

export default CouponsAndOffers;
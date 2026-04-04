import React, { useState } from 'react';
import { FaHamburger, FaShippingFast, FaTimes } from 'react-icons/fa';

const Aboutus = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <section className="about-section" id="about">
      {/* 1. The Popup Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={toggleModal}><FaTimes /></button>
            <h2>Our Culinary Journey</h2>
            <div className="modal-body">
              <p>
                Founded in 2021, <strong>FoodExpress</strong> started with a simple mission: to bridge the gap between world-class chefs and food enthusiasts at home. What began as a small local initiative in Bengaluru has now grown into a network of over 500+ premium restaurants.
              </p>
              <p>
                Our technology stack ensures that your food isn't just delivered, but delivered with its integrity intact. We use heat-mapped routing to find the fastest paths, ensuring your pizza stays crusty and your salad stays crisp.
              </p>
              <h3>Why we are different:</h3>
              <ul>
                <li><strong>Zero Plastic Initiative:</strong> We use 100% biodegradable packaging.</li>
                <li><strong>Chef Partnerships:</strong> We host exclusive "Cloud Kitchen" sessions with Michelin-star chefs.</li>
                <li><strong>Community First:</strong> A portion of every order goes towards feeding local shelters.</li>
              </ul>
              <button className="btn-about" onClick={toggleModal}>Back to Home</button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Main About Section */}
      <div className={`about-container ${showModal ? 'content-blur' : ''}`}>
        <div className="about-image">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" 
            alt="Our Team" 
            className="main-img"
          />
          <div className="experience-badge">
            <h3>5+</h3>
            <p>Years of Service</p>
          </div>
        </div>

        <div className="about-text">
          <span className="sub-title">About Our Service</span>
          <h2>We Deliver the Best Food <br /> in Your City</h2>
          <p className="description">
            At FoodExpress, we believe that great food should be accessible to everyone, 
            anywhere. We partner with local favorites and world-class kitchens.
          </p>

          <ul className="about-features">
            <li>
              <div className="feat-icon"><FaHamburger /></div>
              <div>
                <h4>Quality Ingredients</h4>
                <p>Only the freshest produce and premium meats.</p>
              </div>
            </li>
            <li>
              <div className="feat-icon"><FaShippingFast /></div>
              <div>
                <h4>Super Fast Delivery</h4>
                <p>Hot food delivered in under 30 minutes.</p>
              </div>
            </li>
          </ul>

          <button className="btn-about" onClick={toggleModal}>Learn More</button>
        </div>
      </div>
    </section>
  );
};

export default Aboutus;
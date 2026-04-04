import React from 'react';
import { FaUtensils, FaRocket, FaCheckCircle } from 'react-icons/fa';
import { MdOutlineGpsFixed } from 'react-icons/md';

const Service = () => {
  const services = [
    {
      id: 1,
      title: "Wide Variety",
      description: "Choose from over 500+ local restaurants and international cuisines.",
      icon: <FaUtensils /> 
    },
    {
      id: 2,
      title: "Fast Delivery",
      description: "Our dedicated delivery partners ensure your food arrives hot in 30 mins.",
      icon: <FaRocket />
    },
    {
      id: 3,
      title: "Quality Selection",
      description: "We partner with top-rated kitchens to ensure every meal is a masterpiece.",
      icon: <FaCheckCircle />
    },
    {
      id: 4,
      title: "Live Tracking",
      description: "Stay updated with real-time GPS tracking from the kitchen to your door.",
      icon: <MdOutlineGpsFixed />
    }
  ];

  return (
    <section className="service-section" id="services">
      <div className="service-header">
        <span className="sub-title">Our Services</span>
        <h2>Why Choose FoodExpress?</h2>
        <div className="underline"></div>
      </div>

      <div className="service-grid">
        {services.map((item) => (
          <div key={item.id} className="service-card">
            <div className="service-icon-container">
              {item.icon}
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Service;
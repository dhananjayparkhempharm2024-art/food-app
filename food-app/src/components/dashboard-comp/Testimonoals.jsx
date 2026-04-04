import React from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Saurabh Sharma",
      role: "Food Blogger",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      review: "The fastest delivery I've experienced in Bengaluru. The pizza arrived steaming hot!",
      stars: 5
    },
    {
      id: 2,
      name: "Anjali Rao",
      role: "Regular Customer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      review: "Love the variety of healthy options. The Salad Bowls are my go-to lunch every day.",
      stars: 5
    },
    {
      id: 3,
      name: "Vikram Mehra",
      role: "Software Engineer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      review: "User-friendly interface and great discounts. The real-time tracking is super accurate.",
      stars: 4
    }
  ];

  return (
    <section className="testi-section" id="testimonials">
      <div className="testi-header">
        <span className="sub-title">Testimonials</span>
        <h2>What Our Foodies Say</h2>
        <div className="underline"></div>
      </div>

      <div className="testi-grid">
        {reviews.map((item) => (
          <div key={item.id} className="testi-card">
    
            <div className="quote-icon"><FaQuoteLeft /></div>
            
            <div className="stars">
              {[...Array(item.stars)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            <p className="review-text">"{item.review}"</p>

            <div className="user-info">
              <img src={item.image} alt={item.name} />
              <div>
                <h4>{item.name}</h4>
                <span>{item.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
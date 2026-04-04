import React from 'react';

const Category = () => {
  const categories = [
    { id: 1, name: "Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=80" },
    { id: 2, name: "Burgers", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=200&q=80" },
    { id: 3, name: "Desserts", image: "https://www.foodandwine.com/thmb/kHhXne4qG5U-kInXCqJTG3e2D1s=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/coffee-cookie-crumble-XL-RECIPE0318_0-23b67c3237a449fbbb7226d2fc6db3e2.jpg" },
    { id: 4, name: "Healthy", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=200&q=80" },
    { id: 5, name: "Sushi", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=200&q=80" },
    { id: 6, name: "Pasta", image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=200&q=80" },
  ];

  return (
    <section className="category-section">
      <div className="category-header">
        <h2>In the mood for...</h2>
      </div>
      
      <div className="category-list">
        {categories.map((cat) => (
          <div key={cat.id} className="category-item">
            <div className="category-img-wrapper">
              <img src={cat.image} alt={cat.name} />
            </div>
            <span>{cat.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Category;
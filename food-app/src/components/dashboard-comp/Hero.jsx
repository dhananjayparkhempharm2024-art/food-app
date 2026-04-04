import React from 'react';


const Hero = () => {
    return (
        <section className="hero-container">

            <div className="hero-content">
                <span className="hero-badge">🍕 50% Off your first order</span>
                <h1 className="hero-title">
                    Premium Food <br />
                    <span>Delivered to Your Door</span>
                </h1>
                <p className="hero-subtitle">
                    Experience the finest local cuisines prepared by master chefs,
                    delivered fresh and hot in under 30 minutes.
                </p>

                <div className="hero-search">
                    <input type="text" placeholder="Enter your delivery address..." />
                    <button className="btn-search">Find Food</button>
                </div>

                <div className="popular-tags">
                    <span>Popular:</span>
                    {/*  <a href="#pizza">Pizza</a>
          <a href="#burgers">Burgers</a>
          <a href="#healthy">Healthy</a>
        */ }</div>
            </div>
        </section>
    );
};

export default Hero;
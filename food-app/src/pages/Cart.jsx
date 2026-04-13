import React from 'react'
import { Link } from 'react-router-dom'

const Cart = () => {
    return (
        <div style={{ padding: 24 }}>
            <h2>Cart</h2>
            <p>This is the public cart page.</p>
            <p>If you are a customer, please log in and open your cart from the customer dashboard.</p>
            <Link to="/login">Go to Login</Link>
        </div>
    )
}

export default Cart

import React from 'react';
import './Signup.css';

const Signup = () => {
    return (
        <div className="signup-container">
            <h2>Create an Account</h2>
            <form>
                <label htmlFor="fullname">Full Name</label>
                <input type="text" id="fullname" name="fullname" placeholder="Enter your full name" required />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" required />

                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" required />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required />

                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" required />

                <button type="submit" className="btn dark-btn">Sign Up</button>
            </form>
            <p>Already have an account? <a href="/login">Sign In</a></p>
            <p>Back to <a href="/">Home</a></p>
        </div>
    );
}

export default Signup;

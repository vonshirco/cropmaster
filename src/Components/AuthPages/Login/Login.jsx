import React from 'react';
import './Login.css';

const Login = () => {
    return (
        <div className="login-container">
            <h2>Log In to Your Account</h2>
            <form>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" placeholder="Enter your username" required />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required />

                <button type="submit" className="btn dark-btn">Log In</button>
            </form>
            <p>Forgot your password? <a href="/forgotpassword">Reset it here</a></p>
            <p>Don't have an account? <a href="/signup">Sign Up</a></p>
            <p>Back to <a href="/">Home</a></p>
        </div>
    );
}

export default Login;

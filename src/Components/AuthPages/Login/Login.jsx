import React, { useState } from 'react';
import './Login.css';

const Login = ({ setUser }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestData = {
            username: formData.username,
            password: formData.password,
        };

        try {
            const response = await fetch('https://tyktyk.pythonanywhere.com/api/dj-rest-auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                const data = await response.json();
                const user = {
                    username: data.username,
                    role: data.role,
                    token: data.key,
                };
                localStorage.setItem('user', JSON.stringify(user));
                setUser(user);
                alert('Login successful!');
                window.location.href = `/${data.role}`;
            } else {
                alert('Login failed!');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    return (
        <div className="login-container">
            <h2>Log In to Your Account</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" placeholder="Enter your username" required onChange={handleChange} />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required onChange={handleChange} />

                <button type="submit" className="btn dark-btn">Log In</button>
            </form>
            <p>Forgot your password? <a href="/forgotpassword">Reset it here</a></p>
            <p>Don't have an account? <a href="/signup">Sign Up</a></p>
            <p>Back to <a href="/">Home</a></p>
        </div>
    );
};

export default Login;

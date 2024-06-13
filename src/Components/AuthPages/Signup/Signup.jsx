import React, { useState } from 'react';
import './Signup.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        phone: '',
        role: '',
        password: '',
        confirmPassword: '',
        location: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const requestData = {
            username: formData.fullname,
            password: formData.password,
            repeat_password: formData.confirmPassword,
            email: formData.email,
            role: formData.role,
            phone_number: formData.phone,
            location: formData.location,
            farmer: formData.role === 'farmer' ? { farm_size: 0, crops_grown: [] } : undefined
        };

        try {
            const response = await fetch('https://tyktyk.pythonanywhere.com/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                alert('Registration successful!');
                window.location.href = '/login';
            } else {
                alert('Registration failed!');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    return (
        <div className="signup-container">
            <h2>Create an Account</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="fullname">Username</label>
                <input type="text" id="username" name="username" placeholder="Enter your full name" required onChange={handleChange} />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" required onChange={handleChange} />

                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" required onChange={handleChange} />

                <label htmlFor="role">Role</label>
                <select id="role" name="role" required onChange={handleChange}>
                    <option value="">Register as a ?</option>
                    <option value="farmer">Farmer</option>
                    <option value="buyer">Buyer</option>
                    <option value="expert">Expert</option>
                </select>

                <label htmlFor="location">Location</label>
                <input type="text" id="location" name="location" placeholder="Enter your location" required onChange={handleChange} />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required onChange={handleChange} />

                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" required onChange={handleChange} />

                <button type="submit" className="btn dark-btn">Sign Up</button>
            </form>
            <p>Already have an account? <a href="/login">Sign In</a></p>
            <p>Back to <a href="/">Home</a></p>
        </div>
    );
};

export default Signup;

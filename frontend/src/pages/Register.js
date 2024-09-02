import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import AuthContext from '../context/AuthContext';

const Register = () => {
    const { register } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const { username, email, password } = formData;

    const navigate = useNavigate(); // Initialize useNavigate

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        const success = await register({ username, email, password }); // Await register to complete
        if (success) {
            navigate('/dashboard'); // Redirect to Dashboard if registration is successful
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center">Register for CryptoBettor</h2>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium mb-2">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={onChange}
                            placeholder="Username"
                            required
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            placeholder="Email"
                            required
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            placeholder="Password"
                            required
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                    >
                        Register
                    </button>
                </form>
                <div className="text-center mt-4">
                    <p className="text-sm">
                        Already have an account?{' '}
                        <a href="/login" className="text-blue-500 hover:underline">
                            Login here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;


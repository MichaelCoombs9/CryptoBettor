import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios'; // Import axios to make HTTP requests

const Profile = () => {
    const { user, logout, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    // State for profile updates
    const [firstName, setFirstName] = useState(user?.firstName || '');
    const [lastName, setLastName] = useState(user?.lastName || '');
    const [profilePicture, setProfilePicture] = useState(user?.profilePicture || '');
    const [balance, setBalance] = useState(0);  // Assuming balance is fetched from the backend
    const [previewImage, setPreviewImage] = useState(user?.profilePicture || '');

    useEffect(() => {
        // Fetch user wallet balance from the backend
        // This assumes there's an endpoint to get the balance
        axios.get('/api/v1/users/balance')
            .then(response => setBalance(response.data.balance))
            .catch(error => console.error('Error fetching wallet balance:', error));
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        setProfilePicture(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleProfileUpdate = async () => {
        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('profilePicture', profilePicture);

        try {
            const response = await axios.post('/api/v1/users/updateProfile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Assuming the response includes the updated user data
            setUser(response.data.user);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile.');
        }
    };

    const handleAddFunds = () => {
        // Implement the logic to add funds
        console.log('Add funds clicked');
    };

    const handleWithdrawFunds = () => {
        // Implement the logic to withdraw funds
        console.log('Withdraw funds clicked');
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Navbar */}
            <nav className="bg-gray-800 p-4 flex justify-between">
                <div className="flex space-x-4">
                    <button onClick={() => navigate('/dashboard')} className="text-white hover:underline">Dashboard</button>
                    <button onClick={() => navigate('/live')} className="text-white hover:underline">Live</button>
                    <button onClick={() => navigate('/results')} className="text-white hover:underline">Results</button>
                </div>
                <div className="flex space-x-4">
                    <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button>
                </div>
            </nav>

            {/* Main content */}
            <div className="container mx-auto p-4">
                <div className="flex items-center space-x-4 mb-4">
                    {previewImage && (
                        <img
                            src={previewImage}
                            alt="Profile"
                            className="w-16 h-16 rounded-full"
                        />
                    )}
                    <h1 className="text-3xl font-bold">
                        {firstName} {lastName}
                    </h1>
                </div>

                {/* Profile Information Section */}
                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <h2 className="text-2xl font-bold mb-2">Update Profile</h2>
                    <div className="mb-4">
                        <label className="block text-white mb-2">First Name</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full p-2 rounded bg-gray-700 text-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white mb-2">Last Name</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full p-2 rounded bg-gray-700 text-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white mb-2">Profile Picture</label>
                        <input
                            type="file"
                            onChange={handleProfilePictureChange}
                            className="w-full p-2 rounded bg-gray-700 text-white"
                        />
                    </div>
                    <button
                        onClick={handleProfileUpdate}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Update Profile
                    </button>
                </div>

                {/* User Statistics Section */}
                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <h2 className="text-2xl font-bold mb-2">Statistics</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-gray-700 p-4 rounded text-center">
                            <h3 className="text-xl font-bold">Total Wins</h3>
                            <p className="text-2xl">0</p> {/* Replace with actual data */}
                        </div>
                        <div className="bg-gray-700 p-4 rounded text-center">
                            <h3 className="text-xl font-bold">Total Losses</h3>
                            <p className="text-2xl">0</p> {/* Replace with actual data */}
                        </div>
                        <div className="bg-gray-700 p-4 rounded text-center">
                            <h3 className="text-xl font-bold">Longest Win Streak</h3>
                            <p className="text-2xl">0</p> {/* Replace with actual data */}
                        </div>
                    </div>
                </div>

                {/* Wallet Section */}
                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                    <h2 className="text-2xl font-bold mb-2">Wallet Balance</h2>
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl">{balance} ETH</span>
                        <div className="flex space-x-4">
                            <button
                                onClick={handleAddFunds}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Add Funds
                            </button>
                            <button
                                onClick={handleWithdrawFunds}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Withdraw Funds
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

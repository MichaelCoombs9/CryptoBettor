import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import CreatePoolModal from '../modals/CreatePoolModal'; // Updated import path

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

    // Redirect to Home if the user is not authenticated
    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    if (!user) {
        // Return null or a loading spinner if you want while the redirect happens
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Navbar */}
            <nav className="bg-gray-800 p-4 flex justify-between">
                <div className="flex space-x-4">
                    <button onClick={() => navigate('/profile')} className="text-white hover:underline">Profile</button>
                    <button onClick={() => navigate('/live')} className="text-white hover:underline">Live</button>
                    <button onClick={() => navigate('/results')} className="text-white hover:underline">Results</button>
                </div>
                <div className="flex space-x-4">
                    <button onClick={openModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create Pool</button>
                    <button onClick={() => navigate('/join-pool')} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Join Existing Pool</button>
                    <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button>
                </div>
            </nav>
            
            {/* Main content */}
            <div className="flex items-center justify-center min-h-screen">
                <h1 className="text-3xl font-bold">Welcome to Your Dashboard, {user?.username}</h1>
            </div>

            {/* Create Pool Modal */}
            <CreatePoolModal isOpen={isModalOpen} onRequestClose={closeModal} />
        </div>
    );
};

export default Dashboard;





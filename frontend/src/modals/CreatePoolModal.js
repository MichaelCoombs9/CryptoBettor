import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios'; // Import axios for making HTTP requests

Modal.setAppElement('#root');

const CreatePoolModal = ({ isOpen, onRequestClose }) => {
    const [leagueId, setLeagueId] = useState('');
    const [betAmount, setBetAmount] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make a POST request to your backend API to create the pool
            const response = await axios.post('/api/v1/pools/create', {
                leagueId,
                betAmount
            });
            console.log('Pool created successfully:', response.data);
            // Optionally, handle the response or show a success message
            onRequestClose(); // Close the modal after successful submission
        } catch (error) {
            console.error('Error creating pool:', error);
            // Optionally, handle the error (e.g., show an error message to the user)
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Create Pool"
            className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto mt-20"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Create a New Pool</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">League ID:</label>
                    <input
                        type="text"
                        value={leagueId}
                        onChange={(e) => setLeagueId(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Bet Amount:</label>
                    <select
                        value={betAmount}
                        onChange={(e) => setBetAmount(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    >
                        <option value={1}>$1</option>
                        <option value={2}>$2</option>
                        <option value={5}>$5</option>
                        <option value={10}>$10</option>
                        <option value={25}>$25</option>
                        <option value={50}>$50</option>
                    </select>
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={onRequestClose}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Create Pool
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default CreatePoolModal;



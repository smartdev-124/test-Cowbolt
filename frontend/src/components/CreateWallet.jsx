import React, { useState } from 'react';
import { createNewWallet } from '../utils/fetchData';

export const CreateWallet = ({ onWalletCreated }) => {
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        createNewWallet(username)
            .then((walletAddress) => onWalletCreated(walletAddress))
            .catch((err) => setErrorMsg("Failed to create wallet. Please try again."));

        setIsLoading(false);
    };

    const onChangeUsername = (e) => {
        setErrorMsg("");
        setUsername(e.target.value);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={onChangeUsername}
                    required
                    disabled={isLoading}
                    className="mt-1 p-3 block w-full rounded-md shadow-sm outline-none border-2"
                />
                {errorMsg && <p className="text-red-500">{errorMsg}</p>}
            </div>
            <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
            >
                {isLoading ? 'Creating...' : 'Create Wallet'}
            </button>
        </form>
    );
};

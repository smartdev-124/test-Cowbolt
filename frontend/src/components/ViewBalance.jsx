import React, { useState, useEffect } from 'react';
import { getBalance } from '../utils/fetchData';

export const ViewBalance = ({ walletAddress }) => {
    const [balance, setBalance] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        if (!walletAddress) return;

        getBalance(walletAddress)
            .then((balance) => setBalance(balance))
            .catch((err) => setErrorMsg("Failed to fetch balance."));

    }, [walletAddress]);

    if (!walletAddress) {
        return <p>Please create a wallet first.</p>;
    }

    return (
        <div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-2">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Wallet Balance</h3>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Balance</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {balance !== null ? <p><span className="font-bold">{balance}</span> CRYPTO</p> : 'Loading...'}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
            {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        </div>
    );
};


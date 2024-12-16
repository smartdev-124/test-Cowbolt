import React, { useState } from 'react';
import { initiateTransaction } from '../utils/fetchData';

export const SendCrypto = ({ walletAddress }) => {
    const [inputData, setInputData] = useState({
        recipient: "",
        amount: 0
    })
    const [isLoading, setIsLoading] = useState(false);

    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!walletAddress) return;

        if (Number(inputData.amount) == 0) {
            setErrorMsg("Please input amount.");
            return;
        }

        setIsLoading(true);

        initiateTransaction(walletAddress, inputData.recipient, Number(inputData.amount))
            .then((transactionId) => {
                setInputData({
                    recipient: "",
                    amount: 0,
                });
                setSuccessMsg(`Transaction successful. Transaction ID: ${transactionId}`);
                setErrorMsg("");
            })
            .catch((err) => setErrorMsg(err.response?.data.message));

        setIsLoading(false);
    };

    const onChangeInput = (e) => {
        setSuccessMsg("");
        setErrorMsg("");

        setInputData({
            ...inputData,
            [e.target.name]: e.target.value,
        })
    }

    if (!walletAddress) {
        return <p>Please create a wallet first.</p>;
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">Recipient Address</label>
                <input
                    id="recipient"
                    type="text"
                    value={inputData.recipient}
                    name="recipient"
                    onChange={onChangeInput}
                    required
                    className="mt-1 p-3 block w-full rounded-md shadow-sm outline-none border-2"
                />
            </div>
            <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                <input
                    id="amount"
                    type="number"
                    step="0.000001"
                    value={inputData.amount}
                    name="amount"
                    onChange={onChangeInput}
                    required
                    className="mt-1 p-3 block w-full rounded-md shadow-sm outline-none border-2"
                />
            </div>
            {successMsg && <p className="text-green-500">{successMsg}</p>}
            {errorMsg && <p className="text-red-500">{errorMsg}</p>}
            <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
            >
                {isLoading ? 'Sending...' : 'Send'}
            </button>
        </form>
    );
};


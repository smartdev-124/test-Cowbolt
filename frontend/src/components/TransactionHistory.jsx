import React, { useState, useEffect } from 'react';
import { getTransactionHistory } from '../utils/fetchData';

export const TransactionHistory = ({ walletAddress }) => {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const fetchTransactions = async () => {
            if (!walletAddress) return;
            setIsLoading(true);

            getTransactionHistory(walletAddress)
                .then((transactions) => {
                    console.log(transactions);
                    setTransactions(transactions);
                    setErrorMsg("");
                })
                .catch((err) => setErrorMsg(err.response?.data.message));

            setIsLoading(false);
        };
        fetchTransactions();
    }, [walletAddress]);

    if (!walletAddress) {
        return <p>Please create a wallet first.</p>;
    }

    if (isLoading) {
        return <p>Loading transaction history...</p>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map((transaction, index) => (
                        <tr key={transaction.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.senderAddress}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.recipientAddress}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.amount} CRYPTO</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(transaction.createdAt).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        </div>
    );
};


import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        'Content-Type': 'application/json',
    },
});

const handleApiError = (error) => {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
};

export const createNewWallet = async (username) => {
    try {
        const response = await api.post('/wallet/create', { username });
        return response.data.address;
    } catch (error) {
        handleApiError(error);
    }
};

export const getBalance = async (walletAddress) => {
    try {
        const response = await api.get(`/wallet/${walletAddress}/balance`);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

export const initiateTransaction = async (senderAddress, recipientAddress, amount) => {
    try {
        const response = await api.post('/wallet/send', {
            senderAddress,
            recipientAddress,
            amount
        });

        return response.data;
    } catch (error) {
        handleApiError(error);
    }
}

export const getTransactionHistory = async (walletAddress) => {
    try {
        const response = await api.get(`/wallet/${walletAddress}/transactions`);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
}
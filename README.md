# 🪙 Cryptocurrency Wallet Application

This is an application that manage cryptocurrency wallets using the Ethereum blockchain. Built with **NestJS** and **PostgreSQL**, this API allows users to create wallets, view balances, send cryptocurrency, and fetch transaction histories.

---

## 🚀 Features
- **Create Wallet**: Generate a new Ethereum wallet with a unique address.
- **View Balance**: Retrieve the ETH balance of a wallet.
- **Send Cryptocurrency**: Transfer ETH to another wallet.
- **Transaction History**: Retrieve past transactions for a wallet.
- **Real-Time Balance Updates**: Automatically update wallet balances using blockchain monitoring.
- **Secure Storage**: Wallets are securely managed using PostgreSQL.

---

## 🛠️ Technologies Used

- **Backend Framework**: [NestJS](https://nestjs.com/)
- **Frontend Framework**: [React.js]()
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Blockchain Interaction**: [ethers.js](https://docs.ethers.io/)

---

## ⚙️ Prerequisites

Before running the project, ensure you have:

- [Node.js](https://nodejs.org/) (v16 or later)
- [PostgreSQL](https://www.postgresql.org/)
- An Ethereum node provider (e.g., [Alchemy](https://www.alchemy.com/) or [Infura](https://infura.io/))

---

## 🏗️ Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/smartdev-124/cryptocurrency-wallet.git
    cd cryptocurrency-wallet
2. **Set up environment variables in backend**:
    ```bash
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=your_db_username
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   PORT=
   ETH_RPC_URL=
3. **Install dependencies**:
    ```bash
    cd backend
    npm install

    cd ../frontend
    npm install
4. **Run project**:
    ```bash
    cd backend
    npm run start:dev

    cd ../frontend
    npm start
5. **Access the Application**
    ```bash
   Frontend: Open your browser and navigate to http://localhost:5173.
   Backend: The REST API will be available at http://localhost:3000.
## API Endpoints.
    ----------------------------------------------------------------------------------
    | Method  |	Endpoint	                        | Description                    |
    ----------------------------------------------------------------------------------
    | POST    |	/api/wallet/create                  | Create a new wallet            |
    ----------------------------------------------------------------------------------
    | GET     |	/api/wallet/:address/balance        | Fetch wallet balance           |
    ----------------------------------------------------------------------------------
    | POST    |	/api/wallet/send                    | Send ETH to another wallet     |
    ----------------------------------------------------------------------------------
    | GET     |	/api/wallet/:address/transactions   | Retrieve transaction history   |
    ----------------------------------------------------------------------------------
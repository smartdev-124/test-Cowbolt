import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { CreateWallet } from './components/CreateWallet';
import { ViewBalance } from './components/ViewBalance';
import { SendCrypto } from './components/SendCrypto';
import { TransactionHistory } from './components/TransactionHistory';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  const tabs = [
    { name: 'Create Wallet', component: <CreateWallet onWalletCreated={setWalletAddress} /> },
    { name: 'View Balance', component: <ViewBalance walletAddress={walletAddress} /> },
    { name: 'Send Crypto', component: <SendCrypto walletAddress={walletAddress} /> },
    { name: 'Transaction History', component: <TransactionHistory walletAddress={walletAddress} /> },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Cryptocurrency Wallet: {walletAddress}</h1>
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {tabs.map((tab) => (
            <Tab
              key={tab.name}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 outline-none',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {tab.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {tabs.map((tab, idx) => (
            <Tab.Panel
              key={idx}
              className="rounded-xl bg-white p-3"
            >
              {tab.component}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default App;

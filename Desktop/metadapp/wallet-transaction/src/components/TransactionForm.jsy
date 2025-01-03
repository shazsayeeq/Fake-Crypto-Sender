import React, { useState } from 'react';
import Web3 from 'web3';
import { connectToMetaMask } from '../utils/connectToMetaMask';

const TransactionForm = () => {
  const [account, setAccount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const handleConnect = async () => {
    const acc = await connectToMetaMask();
    setAccount(acc);
  };

  const handleSendTransaction = async () => {
    if (!account) {
      alert('Please connect to MetaMask first.');
      return;
    }

    const web3 = new Web3(window.ethereum);
    const value = web3.utils.toWei(amount, 'ether');

    try {
      await web3.eth.sendTransaction({
        from: account,
        to: recipient,
        value: value,
      });
      alert('Transaction sent!');
    } catch (error) {
      console.error("There was an error sending the transaction:", error);
    }
  };

  return (
    <div>
      <h2>MetaMask Transaction Interface</h2>
      <button onClick={handleConnect}>
        {account ? `Connected: ${account}` : 'Connect to MetaMask'}
      </button>
      <div>
        <input
          type="text"
          placeholder="Recipient Address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Amount in ETH"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button onClick={handleSendTransaction}>Send Transaction</button>
    </div>
  );
};

export default TransactionForm;

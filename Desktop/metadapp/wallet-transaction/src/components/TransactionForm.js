import React, { useState } from 'react';
import Web3 from 'web3';
import { connectToMetaMask } from '../utils/connectToMetaMask';
import Modal from './Modal';

const TransactionForm = () => {
  const [account, setAccount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState('');

  const handleConnect = async () => {
    const acc = await connectToMetaMask();
    setAccount(acc);
  };

  const handleSendTransaction = async () => {
    if (!account) {
      alert('Please connect to MetaMask first.');
      return;
    }

    if (!recipient || !amount) {
      alert('Please enter a recipient address and an amount.');
      return;
    }

    const web3 = new Web3(window.ethereum);
    const value = web3.utils.toWei(amount, 'ether');
    setIsModalOpen(true);
    setTransactionStatus('Sending transaction...');

    try {
      const txHash = await web3.eth.sendTransaction({
        from: account,
        to: recipient,
        value: value,
      });
      setTransactionStatus(`Transaction sent successfully! TxHash: ${txHash}`);
    } catch (error) {
      console.error("There was an error sending the transaction:", error);
      setTransactionStatus(`Transaction failed! Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>MetaMask Transaction Interface</h2>
      <div>
        <button onClick={handleConnect}>
          {account ? `Connected: ${account}` : 'Connect to MetaMask'}
        </button>
      </div>
      {account && (
        <div>
          <h3>Send ETH</h3>
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
      )}
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p>{transactionStatus}</p>
      </Modal>
    </div>
  );
};

export default TransactionForm;

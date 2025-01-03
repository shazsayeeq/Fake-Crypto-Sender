import Web3 from 'web3';

export const connectToMetaMask = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      return accounts[0];
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  } else {
    console.error("MetaMask is not installed.");
  }
};

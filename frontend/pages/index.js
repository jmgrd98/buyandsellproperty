'use client'

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useStateContext } from '../context';

export default function Home() {

  const {contract, address} = useStateContext();

  useEffect(() => {
    console.log(contract);
  })

  useEffect(() => {
    async function connect() {
      if (typeof window.ethereum !== 'undefined') {
        const ethereum = window.ethereum;
        await ethereum.request({ method: 'eth_requestAccounts' });
        const networkId = await ethereum.request({ method: 'net_version' });

        // Connect to the Ethereum network using ethers.js
        const ethProvider = new ethers.providers.Web3Provider(window.ethereum, 'sepolia');
        setProvider(ethProvider);

        // Create a contract instance
        const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your contract address
        // const contractABI = [...]; // Insert your contract's ABI
        const ethContract = new ethers.Contract(contractAddress, contractABI, ethProvider);
        setContract(ethContract);
      }
    }

    connect();
  }, []);

  // Function to request inspection
  const requestInspection = async () => {
    try {
      const tx = await contract.requestInspection();
      await tx.wait();
      alert('Inspection requested successfully.');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const completeInspection = async () => {
    try {
      const tx = await contract.completeInspection(true); // Pass 'true' or 'false' based on inspection status
      await tx.wait();
      alert('Inspection completed successfully.');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  // Function to clear title
  const clearTitle = async () => {
    try {
      const tx = await contract.clearTitle();
      await tx.wait();
      alert('Title cleared successfully.');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  // Function to transfer ownership
  const transferOwnership = async () => {
    try {
      const tx = await contract.transferOwnership();
      await tx.wait();
      alert('Ownership transferred successfully.');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <main className='p-10 flex flex-col align-items justify-center text-center'>
      <h1 className='text-5xl font-bold mb-10'>Real Estate Contract Interaction</h1>


      <section className='flex gap-5 text-center align-items justify-center'>
      {/* <button onClick={requestInspection}>Request Inspection</button>
      <button onClick={completeInspection}>Complete Inspection</button>
      <button onClick={clearTitle}>Clear Title</button>
      <button onClick={transferOwnership}>Transfer Ownership</button> */}
      </section>


    </main>
  );
}

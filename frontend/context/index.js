import React, {useContext, createContext} from 'react';
import {useAddress, useContract, useMetamask, useContractWrite} from '@thirdweb-dev/react';
import {ethers} from 'ethers';

const StateContext = createContext();

const {contract} = useContract('0x27Ace49abcCf046E55eC268fB041E3a5b7284762');

const address = useAddress();
const connect = useMetamask();



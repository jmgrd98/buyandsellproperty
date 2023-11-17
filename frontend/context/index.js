import React, {useContext, createContext} from 'react';
import {useAddress, useContract, useMetamask, useContractWrite} from '@thirdweb-dev/react';
import {ethers} from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({children}) => {
    const {contract} = useContract('0xaBF4B67FBCf2DB45a20b493fd86d02d3E10b789A');
    
    const address = useAddress();
    const connect = useMetamask();

    async function getSeller() {
        const seller = await this.contract.call('getSeller');
        console.log(seller);
    }

    return (
        <StateContext.Provider
            value={{
                address,
                contract,
                connect,
                getSeller
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);




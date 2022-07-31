// Create Explorer page to view tokens and their supply, unique wallets, and transactions
import { Dapp } from 'components/dapps/types';
import IRL from 'components/IRL';
import React, { useState, useEffect } from 'react';

import BubbleSection from '../sections/BubbleSection';
import { dapps } from "../dapp_data";

    
const loadDapps = async () => {
    console.log("loading dapps")
}

const Explorer = () => {

    const [selectedDapp, setSelectedDapp ] = useState<Dapp>(dapps[0]);

    return (<div>
        <h1>Explorer</h1>
        <div>
            <h2>Tokens</h2>
            <BubbleSection dapps={dapps}/>
            {/* <IRL /> */}
            {/* Render all tokens */}
        </div>
    </div>
        );

        }

export default Explorer;



import { useAddress, useContract } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { ethers } from 'ethers';
import { SendFluxToken } from "./tokenOps/SendFluxToken";
import { MintFluxToken } from "./tokenOps/MintFluxToken";
import { ApproveFluxToken } from "./tokenOps/ApproveFluxToken";

import ft from "src/tokenAbi/fluxtoken"
const deployed_address = ft.deployed_address;

export const FluxTokenContainerCard = () =>{

    const [showMintContent, setShowMintContent] = useState(false);
    const [showSendContent, setShowSendContent] = useState(false);
    const [showApproveContent, setShowApproveContent] = useState(false);

    const [symbol, setSymbol] = useState('');
    const [balance, setBalance] = useState('')

    const address = useAddress(); // wallet address

    const { contract } = useContract(deployed_address, ft.abi);

    const mintToken = () =>{
        setShowMintContent(true)
    }

    const sendToken = () =>{
        setShowSendContent(true) // display the send flux token content
    }

    const approveToken = () =>{
        setShowApproveContent(true) // display the approve flux token content
    }

    useEffect(() => {
        const fetchData = async () => {
        //set token info
        setSymbol(await contract?.call("symbol"))
        // set erc20 token balance for the wallet address
        const amount = await contract?.call("balanceOf",[address] )
        setBalance(ethers.utils.formatEther(amount))
    }
    fetchData()
    }, [address , contract, showSendContent, showApproveContent, showMintContent])


    return(
            showSendContent ? (
                    <SendFluxToken setShowSendContent={setShowSendContent}/>
            ) : showApproveContent ? (
                    <ApproveFluxToken setShowApproveContent={setShowApproveContent} />
            ) : showMintContent ? (
                <MintFluxToken setShowMintContent={setShowMintContent} />
            ) :
            (
                <div className="token-card">
                    <div className="first-row">
                        <span className="eth-account">ETH Account: <strong>{address? address : " not connected"}</strong></span>
                    </div>

                    <div className="second-row">
                        <span>Token</span>
                        <span>Symbol</span>
                        <span>Amount</span>
                        <button className="tokenMintBtn" onClick={mintToken}>Mint</button> 
                    </div>
                    {address && (parseInt(balance)>0) && (
                        <div className="third-row">
                            <img className="symbol-img" src={process.env.PUBLIC_URL + 'icons/FT.png'} alt="" />
                            <span>{symbol}</span> 
                            <span>{balance}</span>

                            <button className="tokenOps" onClick={sendToken}>Send</button>
                            <button className="tokenOps" onClick={approveToken}>Approve</button> 

                        </div>
                    )
                    }
                </div>
            )

    )
}
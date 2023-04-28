import { useAddress, useContract } from "@thirdweb-dev/react"
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApproveOceanicNFT } from "./tokenOps/ApproveOceanicNFT";
import { MintOceanicNFT } from "./tokenOps/MintOceanicNFT";
import { SendOceanicNFT } from "./tokenOps/SendOceanicNFT";

import nft from "src/tokenAbi/oceanicNFT";
const deployed_address= nft.deployed_address

export const OceanicNFTContainerCard = () =>{
    const [symbol, setSymbol] = useState('');
    const [tokenNumbers, setTokenNumbers] = useState<Array<number>>([])
    const address = useAddress() // wallet address

    const [showSendContent, setShowSendContent] = useState(false);
    const [showApproveContent, setShowApproveContent] = useState(false);
    const [showMintContent, setShowMintContent] = useState(false);

    const navigate = useNavigate(); // link to NFt
    const [tokenId, setTokenId] = useState(0);


    //get contract instance
    const { contract } = useContract(deployed_address, nft.abi);
    // Trigger fetchData on wallet connect
    useEffect(() =>{
        const fetchData = async () => {
            // set token info
            setSymbol(await contract?.call("symbol"))

            // get all tokenids for the wallet address and metadata for each token id
            const allTokens = await contract?.call("getTokenOwners", [address])
            setTokenNumbers(allTokens.map((token:BigNumber) => token.toNumber()));
        };

        fetchData()
    }, [address, contract, showSendContent, showApproveContent, showMintContent]) // call fetchData when something changes.


    const sendToken = (id: number) =>{
        setTokenId(id);
        setShowSendContent(true)
    }

    const approveToken = (id: number) =>{
        setTokenId(id)
        setShowApproveContent(true)
    }

    const mintToken = () =>{
        setShowMintContent(true)
    }

    const handleNFTClick = (tokenId: number ) => {
        navigate(`/nft/${tokenId}`);
    };

    return(
        <div>
            {
                showSendContent ? (
                    <SendOceanicNFT setShowSendContent={setShowSendContent} tokenId={tokenId} />
            ) : showApproveContent ? (
                    <ApproveOceanicNFT setShowApproveContent={setShowApproveContent} tokenId={tokenId} />
            ) : showMintContent ? (
                    <MintOceanicNFT setShowMintContent={setShowMintContent}/>
            ) :
            (
                <div className="token-card">
                    <div className="first-row">
                        <span className="eth-account">ETH Account: <strong>{address? address : " not connected"}</strong></span>
                    </div>

                    <div className="second-row">
                        <span>Token</span>
                        <span>Symbol</span>
                        <span>ViewNFT</span>
                        <button className="tokenMintBtn" onClick={mintToken}>Mint</button>
                    </div>
                    {address && tokenNumbers.map((tokenId, index) =>(
                        <div className="third-row">
                            <img className="symbol-img" src={process.env.PUBLIC_URL + 'icons/OCNFT.png'} alt="" />
                            <span >{symbol}</span> 
                            <span >
                                <a 
                                    href="#" 
                                    onClick={(e) => { 
                                        e.preventDefault(); 
                                        handleNFTClick(tokenId); 
                                    }} 
                                    style={{ textDecoration: 'underline', color: 'blue', cursor: 'pointer' }}
                                >
                                NFT{tokenId}
                                </a>
                            </span>
                            <button className="tokenOps" onClick={() => sendToken(tokenId)}>Send</button> 
                            <button className="tokenOps" onClick={() => approveToken(tokenId)}>Approve</button> 
                        </div>
                        ))
                    }
                    </div>
                )
            }
        </div>
    )
}
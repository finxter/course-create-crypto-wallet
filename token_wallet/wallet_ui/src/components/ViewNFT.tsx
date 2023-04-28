import {  useParams } from "react-router-dom";
import { ThirdwebNftMedia,useContract, useNFT } from "@thirdweb-dev/react";
import nft from "src/tokenAbi/oceanicNFT";
const contractAddress = nft.deployed_address

export const ViewNFT = () => {
    const { id  } = useParams<{id:string}>();
    const indexNumber = parseInt(id ?? "0", 10);
    const { contract, isLoading } = useContract(contractAddress, nft.abi);
    const { data:mynft } = useNFT(contract, indexNumber); //indexNumber is nothing but token id

    // Rendering NFT Metadata
    return (
    <div>
      {!isLoading && mynft ? (
        <ThirdwebNftMedia metadata={mynft.metadata} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );

}

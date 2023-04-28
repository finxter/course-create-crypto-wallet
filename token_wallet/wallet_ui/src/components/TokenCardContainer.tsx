import { FluxTokenContainerCard } from "./FluxTokenContainerCard"
import { OceanicNFTContainerCard } from "./OceanicNFTContainerCard"

export const TokenCardContainer = () =>{
    return (
        <div className="token-card-container">
            <FluxTokenContainerCard/>
            <OceanicNFTContainerCard/>
        </div>
    )
}
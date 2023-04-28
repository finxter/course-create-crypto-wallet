import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from "@fortawesome/free-solid-svg-icons";

import { ConnectWallet } from "@thirdweb-dev/react";

export const Nav = () =>{
    return (
        <div>
            <div className="nav-bar">
                <span className="nav-bar-facoin">
                    <FontAwesomeIcon icon={faCoins}/>
                    {"  "}
                    TokenWallet
                </span>
                <ConnectWallet theme="light" className="connect-wallet"  /> 

            </div>
        </div>
    )
}
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import { BrowserRouter  as Router} from "react-router-dom";


// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <Router>
    <ThirdwebProvider activeChain={Sepolia}>
      <App />
    </ThirdwebProvider>
  </Router>
);


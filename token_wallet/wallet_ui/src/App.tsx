import { Route, Routes } from "react-router-dom";
import "src/styles/Home.css";
import { Home } from "./components/Home";
import { ViewNFT } from "./components/ViewNFT";

export default function App() {
  return (
    <div>
        <Routes>
            <Route path="/" element={ <Home/> } />

            <Route path="/nft/:id" element={< ViewNFT/>} />
        </Routes>

    </div>
 );
}

const hre = require("hardhat");

// path to json files in pinata, use your own baseURL path to pinata json files (ensure it ends with a /)
const baseURL = ""

async function main() {
  const accounts = await hre.ethers.getSigners()
  const deployer = accounts[0].address
  const ONFT = await hre.ethers.getContractFactory("OceanicNFT");
  const onft = await ONFT.deploy("oceanic", "ONFT", deployer, 500);

  await onft.deployed();
  console.log(
    `onft deployed to ${onft.address}`
  );

for (let i = 0; i <= 7; i++) {
  let tx = await onft.createNFT(deployer, baseURL + i + ".json");
  let receipt = await tx.wait();
  let nftId = receipt.events[1].args[0].toNumber();
  console.log("nft id" + (i + 1) + ":", nftId);
}
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

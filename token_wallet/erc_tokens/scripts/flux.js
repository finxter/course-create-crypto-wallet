const hre = require("hardhat");

async function main() {
  const accounts = await hre.ethers.getSigners()
  const deployer = accounts[0].address
  const FT = await hre.ethers.getContractFactory("FluxToken");
  const ft = await FT.deploy("fluxtoken", "FT");

  await ft.deployed();

  console.log(
    `ft deployed to ${ft.address}`
  );

   // now mint 10000 flux tokens to deployer address
  let amount = ethers.utils.parseUnits("10000", "18");
  let tx = await ft.mintTo(deployer, amount)
  let receipt = await tx.wait();
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


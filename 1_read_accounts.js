
const { ethers } = require("ethers"); //Getting the Ethers.js module

// GETTING PROVIDER(s)
const provider = new ethers.providers.JsonRpcProvider(`https://dataserver-1.zenithchain.co/`)

// --READING THE ZENITH BALANCE OF A ZENITH ADDRESS
const address = '0x629205664639595ba4555EeC1e82B0D96aa292dF'

const getBal = async() => {
    const balance = await provider.getBalance(address)
    const balStore = ethers.utils.formatEther(balance)
    console.log(`ZENITH Balance of ${address} ==> ${balStore} ZENITH \n\n`)  
}

getBal()

// --READING THE ZENITH BALANCE OF MULTIPLE ZENITH ADDRESS
const addresses = ['0x000000000000000000000000000000000000dEaD', '0x1BEDCF3b3a179a0E84D2224364Ed8E1A97C56D05', '0xf01B5B37c9Ee02b3079FD2A214C99d441bD5fE13', '0x3224Acd0269254509A6C555e31b0bb034232F706'];
// Create an array of promises
const promiseArray = addresses.map(async address => {
    // Get ZENITH balance for each address
    const balance = await provider.getBalance(address);
    const balStore = ethers.utils.formatEther(balance)
    // Output each address with its balance
    console.log(`Address ${address} has a balance of ${balStore.toString()} ZENITH \n\n`);
  });
  // Wait for all promises to resolve
  Promise.all(promiseArray);


/*
TO TEST THIS:
- Install ethers using 'npm install ethers'
- In your terminal run the command 'node 1_read_accounts'

*/

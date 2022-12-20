
const { ethers } = require("ethers"); //Getting the Ethers.js module

// GETTING PROVIDER(s)
const provider = new ethers.providers.JsonRpcProvider(`https://dataserver-1.zenithchain.co/`)

// ABI of a ZEN-20 token contract
const ZEN20ABI = [
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

// LIST OF SOME ZEN-20 TOKEN ADDRESSES ON ZENITH CHAIN
const busdAddress = '0xf74886C5bf8459bdB5a6d3bA26e8509b8C0a6aB9'
const wZenithAddress = '0xFd334DE50e0D8981940dF9607C673787Bf95bfDC'
const tUSDCAddress = '0x0850Be42C30703b1C165899800BD60aA81bA9F25'
const usdtAddress = '0x35adC9E3D82AD42B74e8c7D8B0f7667A26b9B7d8'
const astronoAddress = '0x01A31fd10DD22f5D6b8398C6aF8562e6faD9CB85'


// ZENITH ADDRESS
const address = '0x94e2D6a40Fc05abE5A6E94c56Fc35FECc4D37a99'


// FUNCTION TO RETRIEVE ALL TOKEN BALANCES
const getZen20Bal = async () => {
    const zenithBalance = await provider.getBalance(address)
    const zenithBal = ethers.utils.formatEther(zenithBalance)

    let busdContract = new ethers.Contract(busdAddress, ZEN20ABI, provider);
    let busdAmount = await busdContract.balanceOf(address);
    const busdBalance = ethers.utils.formatEther(busdAmount)

    let wZenithContract = new ethers.Contract(wZenithAddress, ZEN20ABI, provider);
    let wZenithAmount = await wZenithContract.balanceOf(address);
    const wZenithBalance = ethers.utils.formatEther(wZenithAmount)

    let tUSDCContract = new ethers.Contract(tUSDCAddress, ZEN20ABI, provider);
    let tUSDCAmount = await tUSDCContract.balanceOf(address);
    const tUSDCBalance = ethers.utils.formatEther(tUSDCAmount)

    let usdtContract = new ethers.Contract(usdtAddress, ZEN20ABI, provider);
    let usdtAmount = await usdtContract.balanceOf(address);
    const usdtBalance = ethers.utils.formatEther(usdtAmount)

    let astronoContract = new ethers.Contract(astronoAddress, ZEN20ABI, provider);
    let astronoAmount = await astronoContract.balanceOf(address);
    const astronoBalance = ethers.utils.formatEther(astronoAmount)

    console.log(`======= READING ALL TOKEN BALANCES FOR ADDRESS (${address}) ====== \n`)
    console.log(`ZENITH  ====> ${zenithBal} ZENITH \n`)
    console.log(`BUSD ====> ${busdBalance} BUSD \n`)
    console.log(`Wrapped ZENITH ====> ${wZenithBalance} WZENITH \n`)
    console.log(`Test Pegged USDC ====> ${tUSDCBalance} T-USDC \n`)
    console.log(`Tether USD ====> ${usdtBalance} USDT \n`)
    console.log(`ASTRONO ====> ${astronoBalance} ASTRONO \n`)
}

getZen20Bal()


/*
TO TEST THIS:
- Install ethers using 'npm install ethers'
- In your terminal run the command 'node 2_read_tokens'
*/

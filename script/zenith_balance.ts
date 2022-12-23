import { ethers } from "ethers";

// ZENITH ADDRESS
const address = "0x7AF80640D1727316937566a9F65bAb21c5b6DDf6";

interface IToken {
  name: string;
  symbol: string;
  address: string;
}

const tokenAddresses: IToken[] = [
    { name: 'BUSD', symbol: 'BUSD', address: '0xf74886C5bf8459bdB5a6d3bA26e8509b8C0a6aB9' },
    { name: 'Wrapped ZENITH', symbol: 'WZENITH', address:'0xFd334DE50e0D8981940dF9607C673787Bf95bfDC'},
    { name: 'Test Pegged USDC', symbol: 'T-USDC', address: '0x0850Be42C30703b1C165899800BD60aA81bA9F25' },
    { name: 'Tether USD', symbol: 'USDT', address:'0x35adC9E3D82AD42B74e8c7D8B0f7667A26b9B7d8'},
    { name: 'ASTRONO', symbol: 'ASTRONO', address:'0x01A31fd10DD22f5D6b8398C6aF8562e6faD9CB85'},
    { name: 'BlueBird', symbol: 'BBIRD', address:'0x3B9538751B6878356D1Eb26f54500f4D560398b9'},
    { name: 'BlueBirdToken', symbol: 'BIRD', address:'0x23675338E75e0F4343d951a62f7e9127385A073B'},
    { name: 'Brian Token', symbol: 'BRIAN', address:'0x2DC06BcD723Cc642763407Cf0774eCEB1a4815Ca'},
    { name: 'JustMoney LP Shares', symbol: 'JMS', address:'0x0c541924C5229C7206673b0aEb3487d4b1eB5C5c'},
    { name: 'Meta INU', symbol: 'MIN', address:'0x7d18E700b1AfCA1bc6742C1D0a915A94BFE94508'},
    { name: 'PeegedTokenUSDT', symbol: 'T-USDT', address:'0x5aD4F218871A2Ed615C02D1c7aCE757D3De2f793'},
    { name: 'Zenith-peg USD', symbol: 'USDT', address:'0xba7Fc3b2058A048FF4f6cbbE018006281096E465'},
    { name: 'ZenithToken', symbol: 'ZENT', address:'0x48ccB51AFe73C28C3658E8A4eaC3C7B5B0ECB666'},
    { name: 'USD Zenith-peg Coin', symbol: 'USDC', address:'0xc19CA21c0D1DFb707535615a2f056Febd3C30F4B'},
    { name: 'USDC', symbol: 'USDC', address: '0xeBFfE12B71c9f8Abcf984F8675d8cFEcC9d11Cf9'}
  ];

// ABI of a ZEN-20 token contract
const ZEN20ABI = [
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

// GETTING PROVIDER(s)
const provider = new ethers.providers.JsonRpcProvider(
  `https://dataserver-1.zenithchain.co/`
);

//Create array to store promises for each token balance
let balances: any[] = [];

//Loop through token addresses, create a promise for each balance and store in array
async function getZenithBalance() {
    // Retrieving Zenith Balances
    const balance = await provider.getBalance(address)
    const zenithBal = ethers.utils.formatEther(balance)
    balances.push(`Name: ZENITH, Symbol: ZENITH, Balance: ${zenithBal}`)
    //OUTPUT

    // Retrieving ZEN-20 Balances
    for await(const token of tokenAddresses) {
        let contract: any = new ethers.Contract(token.address, ZEN20ABI, provider);
        let balance: number = await contract.balanceOf(address);
        const formatBal : any = ethers.utils.formatEther(balance)
        balances.push(`Name: ${token.name}, Symbol: ${token.symbol}, Balance: ${formatBal}`)
    }

    //OUTPUT
    console.log(balances)
}

getZenithBalance()


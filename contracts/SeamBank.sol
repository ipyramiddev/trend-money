//SPDX-License-Identifier: UNLISCENSED
pragma solidity >=0.7.0;
import { SafeMath } from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract SeamBank is Ownable{

    using SafeMath for uint;
    uint256 internal constant PRECISION = 10 ** 18;
    
    // address public governance;
    // address public beneficiary;

    // store all supported farms across celo
    // MAIN NET
    //Token Contract Address for cUSD: 0x765de816845861e75a25fca122bb6898b8b1282a
    //Token Contract Address for cEUR: 0xd8763cba276a3738e6de85b4b3bf5fded6d6ca73
    // Mobius cUSD-UST pool: 0x9F4AdBD0af281C69a582eB2E6fa2A594D4204CAe
    // Mobius cUSD-DAI pool: 0xF3f65dFe0c8c8f2986da0FEc159ABE6fd4E700B4
    // Mobius cUSD-cUSDC pool: 0x9906589Ea8fd27504974b7e8201DF5bBdE986b03
    // Ubeswap mCUSD-mEUR pool:
    // Sushiswap cUSD-cEUR pool:
    // Sushiswap cUSD-USDC pool:
    // Sushiswap cUSD-DAI pool:
    // Symmetric cUSD-cEUR pool:


    // TEST NET
    // Token Contract Address for cUSD: 0x874069fa1eb16d44d622f2e0ca25eea172369bc1
    // Token Contract Address for cEUR: 0x10c892a6ec43a53e45d0b916b4b7d383b1b78c0f

    

    //mapping(string => SubPool) public farms;
    // mapping(string => SeamPool) public farms;

    struct SeamPool {
        address stakingToken;
        uint256 stakingAmount;

        // may need to define an interface for the different DEXs
        address payable poolAddress;
        
        // mapping between the names of the farms and allocations weights
        mapping(farms => uint256) allocationWeights;

        // mapping between the depositors and their positions in cUSD
        mapping(address => uint256) positions;
    }

    

    mapping(address => SeamPool) public subPools;

    /**
     * @notice Constructor
     * @param _name name of the pool share token
     * @param _symbol symbol of the pool share token
     * @param _depositToken the Deposit Token contract (e.g. cUSD)
     */

    constructor(
        // string memory _name,
        // string memory _symbol,
        IERC20 _depositToken
    )
    {
        depositToken = _depositToken;
        // _approveDepositToken(1);
        // Enter compound token market
        // subPools = new SeamPool[](3);

        
        subPools[subPool.poolAddress] = subPool;
        

        
        // for(uint i = 0; i < 4; i++) {
        //     SubPool subPool = new SubPool();
        //     subPool.stakingToken = address(0);
        //     subPool.poolAddress = address(0);
        //     subPool.weight = 0.25;
        //     farms.push(subPool);
        // }

    }

    // function addSeamPool(SubPool[] _subPools) public {


    // }

    /**
     * @notice Called by someone wishing to deposit to the bank. This amount, plus previous user's balance, will always be withdrawable
     * @dev Allowance for CompoundPool to transferFrom the msg.sender's balance must be set on the deposit token
     * @param _amount The amount of deposit tokens to deposit
     */
    function deposit(IERC20 _token, address _depositor, uint256 _amount) external returns (uint256 _depositId) {
        require(_token.allowance(msg.sender, address(this)) >= _amount, 'Approve tokens first!');
        require(depositToken.transferFrom(msg.sender, address(this), _amount), "YETFPool::deposit: Transfer failed");

        // send tokens to the balance of the SeamBank contract
        _token.safeTransferFrom(msg.sender, address(this), _amount);

        // when a user deposits, their position info is minted as an NFT

    }


        /**
     * @notice Called by someone wishing to withdraw from the bank
     * @dev This will fail if msg.sender doesn't have at least _amount pool share tokens
     * @param _amount The amount of deposit tokens to withdraw
     */
    function withdraw(uint256 _amount) public {
        // _burn(msg.sender, _amount);
        //require(compoundToken.fetchUnderlying(_amount) == 0, "YETFPool::withdraw: Compound redeem failed");
        require(depositToken.transfer(msg.sender, _amount), "YEFTPool::withdraw: Transfer failed");
    }



}
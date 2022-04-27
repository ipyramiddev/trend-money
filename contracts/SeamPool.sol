//SPDX-License-Identifier: UNLISCENSED
pragma solidity ^0.8.2;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./interfaces/ISushiOperator.sol";
import "./interfaces/IUbeswapOperator.sol";

contract SeamPool is Ownable{
    using SafeMath for uint256;
    using SafeERC20 for IERC20;


    ISushiOperator private sushiOperator;
    string name;
    string symbol;

struct SubPool {
        // address stakingToken;
        address payable poolAddress; //
        string[] assets;
        uint256 weight;
    }

    constructor(
        string memory _name,
        string memory _symbol,
        address[] memory _farms
    ) public {
        name = _name;
        symbol = _symbol;

        SubPool subPool = SubPool(
            address(0x9F4AdBD0af281C69a582eB2E6fa2A594D4204CAe), // Mobius cUSD-UST pool
            ["cUSD", "ust"],
            25
        );

        // farms = new SeamPool[](3);
        // for(uint i = 0; i < 4; i++) {
        //     SubPool subPool = new SubPool();
        //     subPool.stakingToken = address(0);
        //     subPool.poolAddress = address(0);
        //     subPool.weight = 0.25;
        //     farms.push(subPool);
        // }
    }

    
}
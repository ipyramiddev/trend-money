pragma solidity >=0.7.0;
// SPDX-License-Identifier: UNLISCENSED;
// import "remix_tests.sol";
import "../SeamBank.sol";
import "../mocks/DepositERC20Mock.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
contract SeamBankTest {
    address testFunder;
    //address payable[] ypAddrs;
    YETFPool poolTest;
    IERC20 depositTokenTest;
    function beforeAll () public {
        testFunder = msg.sender;
        depositTokenTest = new DepositERC20Mock("DepositERC20Mock", "DEPM", testFunder, 100);
        poolTest = new SeamBank("ypp","ypp");

    }
    
    
}

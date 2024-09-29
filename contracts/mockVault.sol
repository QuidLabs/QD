// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity =0.8.8; 

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract mockVault is ERC4626 { 
    
    uint constant public WAD = 1e18; 

    // Pass the underlying asset (ERC20 token) to ERC4626 constructor
    constructor(ERC20 asset) ERC20("mock", "mock") ERC4626(asset) {}

    function mint() external {
        _mint(msg.sender, WAD * 10000);
    }

}
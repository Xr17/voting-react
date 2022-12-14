// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SimpleStorage is ERC20{

  constructor() ERC20("ATOKEN", "ATK"){  }

  function mint() external {
    _mint(msg.sender, 1000000000000000000);
  }
}

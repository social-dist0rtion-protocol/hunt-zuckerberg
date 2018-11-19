pragma solidity ^0.4.24;

contract HuntZuckerberg {
   event CodeRedeemed(uint code, address indexed player);

   mapping (uint256 => address) public hashedCodeToPlayer;
   mapping (address => uint16) public playerToCodeCount;

   constructor() public {
      // TODO: hardcode hashes before going live 
      string[3] memory codes = ['1234', '2345', '3456'];
      for (uint i = 0; i < codes.length; i++) {
         uint hashedCode = uint(keccak256(abi.encodePacked(codes[i])));
         hashedCodeToPlayer[hashedCode] = address(1);
      }
   }

   function redeem(string _code) public {
      uint hashedCode = uint(keccak256(abi.encodePacked(_code)));
      require(hashedCodeToPlayer[hashedCode] != address(1));
      require(hashedCodeToPlayer[hashedCode] != address(0));

      hashedCodeToPlayer[hashedCode] = msg.sender;
      playerToCodeCount[msg.sender]++;
      emit CodeRedeemed(hashedCode, msg.sender);
   }
}

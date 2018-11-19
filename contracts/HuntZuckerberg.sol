pragma solidity ^0.4.24;
import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';

contract HuntZuckerberg is Ownable {
   event CodeRedeemed(uint code, address indexed player);

   mapping (uint256 => address) public hashedCodeToPlayer;
   mapping (address => uint16) public playerToCodeCount;

   address[] public players;

   function reset() public onlyOwner {
      // TODO: hardcode hashes before going live 
      string[3] memory codes = ['1234', '2345', '3456'];
      for (uint i = 0; i < codes.length; i++) {
         uint hashedCode = uint(keccak256(abi.encodePacked(codes[i])));
         hashedCodeToPlayer[hashedCode] = address(1);
      }

      for(uint j = 0; j < players.length; j++) {
         playerToCodeCount[players[j]] = 0;
      }

      delete players;
   }

   constructor() public {
      reset();
   }

   function redeem(string _code) public {
      uint hashedCode = uint(keccak256(abi.encodePacked(_code)));
      require(hashedCodeToPlayer[hashedCode] == address(1));

      if(playerToCodeCount[msg.sender] == 0) {
         players.push(msg.sender);
      }

      hashedCodeToPlayer[hashedCode] = msg.sender;
      playerToCodeCount[msg.sender]++;
      emit CodeRedeemed(hashedCode, msg.sender);
   }
}

pragma solidity ^0.4.24;
import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';

contract HuntZuckerberg is Ownable {
   event CodeRedeemed(uint indexed code, address indexed player);

   mapping (uint256 => address) public hashedCodeToPlayer;
   mapping (address => uint16) public playerToCodeCount;

   address[] public players;
   uint256[] public activatedHashedCodes;

   function reset(uint[] hashedCodes) public onlyOwner {
      for (uint i = 0; i < hashedCodes.length; i++) {
         uint hashedCode = hashedCodes[i];
         hashedCodeToPlayer[hashedCode] = address(1);
      }

      for(uint j = 0; j < players.length; j++) {
         playerToCodeCount[players[j]] = 0;
      }

      delete players;
      delete activatedHashedCodes;
   }

   constructor(uint[] hashedCodes) public {
      reset(hashedCodes);
   }

   function getActivatedHashedCodes() public view returns (uint []){
      return activatedHashedCodes;
   } 

   function redeem(string _code) public {
      uint hashedCode = uint(keccak256(abi.encodePacked(_code)));
      require(hashedCodeToPlayer[hashedCode] == address(1));

      if(playerToCodeCount[msg.sender] == 0) {
         players.push(msg.sender);
      }

      hashedCodeToPlayer[hashedCode] = msg.sender;
      activatedHashedCodes.push(hashedCode);
      playerToCodeCount[msg.sender]++;
      emit CodeRedeemed(hashedCode, msg.sender);
   }
}

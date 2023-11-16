// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RealEstateContract {
    ERC20 public usdtToken = ERC20(0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48);
    address public seller;
    address public buyer;
    uint256 public totalPurchasePrice;
    uint256 public downPaymentDate;
    uint256 public downPaymentAmount;
    uint256 public closingDate;
    bool public propertyInspected;
    bool public titleCleared;

    enum ContractState { Created, OnInspection, Inspected, TitleCleared, Completed }
    ContractState public state = ContractState.Created;

    event InspectionRequested();
    event InspectionCompleted(bool propertyInspected);
    event TitleCleared();
    event OwnershipTransferred();

    modifier onlySeller() {
        require(msg.sender == seller, "Only the seller can call this function");
        _;
    }

    modifier onlyBuyer() {
        require(msg.sender == buyer, "Only the buyer can call this function");
        _;
    }

    constructor(
        address _buyer,
        uint256 _totalPurchasePrice,
        uint256 _downPaymentDate,
        uint256 _downPaymentAmount,
        uint256 _closingDate
        )
        
    {
        seller = msg.sender;
        buyer = _buyer;
        totalPurchasePrice = _totalPurchasePrice;
        downPaymentDate = _downPaymentDate;
        downPaymentAmount = _downPaymentAmount;
        closingDate = _closingDate;
        usdtToken = ERC20(0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48);
    }

    function setDownPaymentDate(uint256 _downPaymentDate) public {
        downPaymentDate = _downPaymentDate;
    }

    function requestInspection() public onlyBuyer {
        require(state == ContractState.Created, "Inspection already requested.");
        state = ContractState.OnInspection;
        emit InspectionRequested();
    }

    function completeInspection(bool _propertyInspected) public onlySeller {
        require(state == ContractState.OnInspection, "Inspection must be requested first.");
        propertyInspected = _propertyInspected;
        emit InspectionCompleted(propertyInspected);
        if (propertyInspected) {
            state = ContractState.TitleCleared;
            emit TitleCleared();
        } else {
            state = ContractState.Completed;
        }
    }

    function makeDownPayment() public payable onlyBuyer {
        totalPurchasePrice = totalPurchasePrice - downPaymentAmount;
        require(state == ContractState.OnInspection, "Down payment can only be made during the inspection phase.");
        require(block.timestamp < downPaymentDate, "Down payment period has ended.");
        require(usdtToken.transferFrom(buyer, seller, downPaymentAmount), "Down payment transfer failed");
    }

    function makeFinalPayment() public payable onlyBuyer {
        require(state == ContractState.Completed, "Final payment can only be made after the transaction is completed.");
        require(block.timestamp < closingDate, "Closing date has passed.");
        require(usdtToken.transferFrom(buyer, seller, totalPurchasePrice), "Final payment transfer failed");
    }

    function clearTitle() public onlySeller {
        require(state == ContractState.TitleCleared, "Title can only be cleared after inspection.");
        titleCleared = true;
        state = ContractState.Completed;
    }

    function transferOwnership() public onlySeller {
        require(state == ContractState.Completed, "Transaction must be completed.");
        seller = buyer;
        buyer = address(0);
        state = ContractState.Created;
        emit OwnershipTransferred();
    }

    function cancelContract() public {
        require(state != ContractState.Completed, "Contract cannot be canceled after completion.");
    
        if (msg.sender == seller) {
            state = ContractState.Completed;
        } else if (msg.sender == buyer) {
            require(state != ContractState.TitleCleared, "Buyer cannot cancel after title is cleared.");
            state = ContractState.Completed;
        }
        uint refundAmount = totalPurchasePrice / 2;
        require(usdtToken.transferFrom(seller, buyer, refundAmount), "Refund transfer failed");
    }
}

# Syntheverse Genesis Contracts - Mainnet Deployment Details

## Contract 1: SyntheverseGenesisSYNTH90T

### Contract Name
```
SyntheverseGenesisSYNTH90T
```

### Contract File
```
contracts/SyntheverseGenesisSYNTH90T.sol
```

### Contract Type
ERC-20 Token (extends OpenZeppelin ERC20)

### Key Details

**Token Information**:
- **Name**: "Syntheverse Genesis SYNTH 90T"
- **Symbol**: "SYNTH"
- **Decimals**: 18
- **Total Supply**: 90,000,000,000,000 SYNTH (90 Trillion tokens)

**Constructor Parameter**:
- `motherlodeVault` (address): Address that will receive all tokens

**Constants**:
```solidity
TOTAL_SUPPLY = 90_000_000_000_000 ether;  // 90 trillion × 10^18
GOLD         = 45_000_000_000_000 ether;  // 50% of total
SILVER       = 22_500_000_000_000 ether;  // 25% of total
COPPER       = 22_500_000_000_000 ether;  // 25% of total
```

**Immutable Variables**:
- `MOTHERLODE_VAULT`: The address receiving the one-time mint (immutable after deployment)

**Events**:
```solidity
event MotherlodeMinted(
    address indexed vault,
    uint256 total,
    uint256 gold,
    uint256 silver,
    uint256 copper
);
```

### Contract Code Summary

```solidity
contract SyntheverseGenesisSYNTH90T is ERC20 {
    address public immutable MOTHERLODE_VAULT;
    uint256 public constant TOTAL_SUPPLY = 90_000_000_000_000 ether;
    uint256 public constant GOLD = 45_000_000_000_000 ether;
    uint256 public constant SILVER = 22_500_000_000_000 ether;
    uint256 public constant COPPER = 22_500_000_000_000 ether;
    
    constructor(address motherlodeVault) ERC20("Syntheverse Genesis SYNTH 90T", "SYNTH") {
        require(motherlodeVault != address(0), "VAULT_ZERO");
        MOTHERLODE_VAULT = motherlodeVault;
        _mint(motherlodeVault, TOTAL_SUPPLY);
        emit MotherlodeMinted(motherlodeVault, TOTAL_SUPPLY, GOLD, SILVER, COPPER);
    }
}
```

### Key Features

✅ **One-time Mint**: All 90T tokens minted at deployment  
✅ **Fixed Supply**: No additional minting function  
✅ **Immutable Vault**: Vault address cannot be changed  
✅ **OpenZeppelin ERC20**: Uses battle-tested implementation  
✅ **Event Emissions**: Metallic semantics emitted as events  
✅ **No Admin Functions**: Fully decentralized after deployment  

### Deployment Parameters

- **Constructor Argument**: `0x3563388d0e1c2d66a004e5e57717dc6d7e568be3` (Motherlode Vault)
- **Estimated Gas**: ~606,592 gas
- **Estimated Cost**: ~0.00015-0.0002 ETH

---

## Contract 2: SyntheverseGenesisLensKernel

### Contract Name
```
SyntheverseGenesisLensKernel
```

### Contract File
```
contracts/SyntheverseGenesisLensKernel.sol
```

### Contract Type
Stateless Event Emitter (Custom contract, no ERC standard)

### Key Details

**Constructor Parameters**: None

**State Variables**: None (stateless contract)

**Events**:
```solidity
event Signal(
    address indexed actor,
    bytes32 indexed kind,
    bytes32 indexed subject,
    bytes data
);

event Attestation(
    address indexed actor,
    bytes32 indexed key,
    bytes32 value
);

event Note(
    address indexed actor,
    string note
);
```

**Public Functions**:
```solidity
function signal(bytes32 kind, bytes32 subject, bytes calldata data) external
function attest(bytes32 key, bytes32 value) external
function note(string calldata text) external
```

### Contract Code Summary

```solidity
contract SyntheverseGenesisLensKernel {
    event Signal(address indexed actor, bytes32 indexed kind, bytes32 indexed subject, bytes data);
    event Attestation(address indexed actor, bytes32 indexed key, bytes32 value);
    event Note(address indexed actor, string note);
    
    function signal(bytes32 kind, bytes32 subject, bytes calldata data) external {
        emit Signal(msg.sender, kind, subject, data);
    }
    
    function attest(bytes32 key, bytes32 value) external {
        emit Attestation(msg.sender, key, value);
    }
    
    function note(string calldata text) external {
        emit Note(msg.sender, text);
    }
}
```

### Key Features

✅ **Stateless**: No storage, events only  
✅ **Permissionless**: No admin functions  
✅ **Minimal Gas**: Very low gas costs for event emissions  
✅ **Three Primitives**: Signal, Attestation, Note events  
✅ **No Upgradeability**: Immutable contract design  

### Deployment Parameters

- **Constructor Arguments**: None
- **Estimated Gas**: ~207,278 gas
- **Estimated Cost**: ~0.00005-0.00008 ETH

---

## Deployment Summary

### Total Deployment

| Item | Value |
|------|-------|
| **Contracts** | 2 |
| **Total Gas** | ~813,870 gas |
| **Total Cost** | ~0.0002-0.0003 ETH (~$0.50-$0.75) |
| **Network** | Base Mainnet (Chain ID: 8453) |
| **Deployer** | 0x3563388d0E1c2D66A004E5E57717dc6D7e568BE3 |
| **Motherlode Vault** | 0x3563388d0e1c2d66a004e5e57717dc6d7e568be3 |

### Deployment Sequence

1. Deploy `SyntheverseGenesisSYNTH90T` with vault address
2. Deploy `SyntheverseGenesisLensKernel` (no parameters)
3. Generate deployment receipts
4. Verify on BaseScan

---

*Contract details extracted from source code*  
*Prepared for Base Mainnet deployment*  
*Date: January 2, 2026*


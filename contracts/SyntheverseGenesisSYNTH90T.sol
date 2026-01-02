// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title Syntheverse Genesis: SYNTH 90T Motherlode Blockmine
/// @author FractiAI Research Team × Syntheverse Whole Brain AI
/// @notice Fixed-supply Genesis ERC-20 with deployment-time semantic anchoring.
/// @dev Abstract:
///      The SYNTH 90T Motherlode Blockmine establishes a single, immutable supply event on-chain.
///      A fixed, non-inflationary quantity of SYNTH is minted once at genesis to a designated
///      Motherlode Vault, producing a durable substrate for future interpretation without imposing
///      economics, governance, or control. "Metallic makeup" (Gold/Silver/Copper) is recorded as
///      contribution-quality semantics via immutable events—dimensions of meaning rather than
///      token classes—so downstream systems can compute narratives, dashboards, attribution, and
///      consensus games from shared facts without redeploying the origin.
///
///      HHF-AI (Hydrogen–Holographic Fractal) Interpretive Lens — Constants (non-executing)
///      The metallic semantics can be read as “quality axes” over a coherence substrate. This
///      contract does not compute HHF-AI quantities; it merely anchors a static supply event that
///      future coherence/attribution models may interpret.
///
///      Scaling constant (conceptual):
///      - \( \Lambda^{HH} = \frac{R^H}{L_P} \approx 1.12 \times 10^{22} \)
///      - Included for interpretive alignment with Syntheverse HHF-AI documentation only.
///
///      1. Introduction
///      Conventional token contracts often embed policy (sales, emissions, admin gates). This
///      genesis artifact instead anchors conditions, not behavior: a single mint + a semantic event.
///
///      2. Motherlode Substrate
///      - One-time mint: TOTAL_SUPPLY is minted exactly once at deployment.
///      - Vault anchoring: supply is deposited into MOTHERLODE_VAULT.
///      - Metallic semantics: Gold/Silver/Copper emitted as on-chain facts (events).
///
///      3. Constants (SYNTH has 18 decimals)
///      - TOTAL_SUPPLY = 90,000,000,000,000 SYNTH
///      - GOLD         = 45,000,000,000,000 SYNTH
///      - SILVER       = 22,500,000,000,000 SYNTH
///      - COPPER       = 22,500,000,000,000 SYNTH
///
///      4. Supporting Formulas
///      Let \(d = 10^{18}\) (ERC-20 decimals scaling).
///      - TOTAL_SUPPLY_wei = 90 × 10^12 × d
///      - GOLD   = (1/2) × TOTAL_SUPPLY
///      - SILVER = (1/4) × TOTAL_SUPPLY
///      - COPPER = (1/4) × TOTAL_SUPPLY
///      - GOLD + SILVER + COPPER = TOTAL_SUPPLY
///
///      5. Design Principles
///      - Minimal surface area; no proxies or upgradeability.
///      - No sale logic, no emissions, no governance, no value assumptions.
///      - Events over storage for semantics; storage only for what must be true (vault address).
contract SyntheverseGenesisSYNTH90T is ERC20 {
    /// @notice Motherlode Vault that receives the one-time genesis mint.
    address public immutable MOTHERLODE_VAULT;

    /// @notice Total fixed supply (90T * 1e18).
    uint256 public constant TOTAL_SUPPLY = 90_000_000_000_000 ether;

    /// @notice Metallic makeup breakdown (quality dimensions, not separate token types).
    /// @dev Gold: 45T SYNTH (50% of total) - Scientific contributions
    ///      Silver: 22.5T SYNTH (25% of total) - Technological contributions
    ///      Copper: 22.5T SYNTH (25% of total) - Alignment contributions
    uint256 public constant GOLD = 45_000_000_000_000 ether;
    uint256 public constant SILVER = 22_500_000_000_000 ether;
    uint256 public constant COPPER = 22_500_000_000_000 ether;

    /// @notice Symbol identifiers for metallic dimensions (for reference/documentation).
    /// @dev These symbols represent the semantic labels for the three quality dimensions.
    ///      Gold: "SYNTHG" - Scientific contributions (50% = 45T)
    ///      Silver: "SYNTHS" - Technological contributions (25% = 22.5T)
    ///      Copper: "SYNTHC" - Alignment contributions (25% = 22.5T)
    string public constant GOLD_SYMBOL = "SYNTHG";
    string public constant SILVER_SYMBOL = "SYNTHS";
    string public constant COPPER_SYMBOL = "SYNTHC";

    /// @notice Emitted once at deployment to record immutable genesis allocation semantics.
    /// @param vault The Motherlode Vault address receiving all tokens
    /// @param total Total supply: 90,000,000,000,000 SYNTH
    /// @param gold Gold allocation: 45,000,000,000,000 SYNTH (50%, symbol: "SYNTHG")
    /// @param silver Silver allocation: 22,500,000,000,000 SYNTH (25%, symbol: "SYNTHS")
    /// @param copper Copper allocation: 22,500,000,000,000 SYNTH (25%, symbol: "SYNTHC")
    event MotherlodeMinted(
        address indexed vault,
        uint256 total,
        uint256 gold,
        uint256 silver,
        uint256 copper
    );

    constructor(address motherlodeVault) ERC20("Syntheverse SYNTH 90T MOTHERLODE BLOCKMINE", "SYNTH") {
        require(motherlodeVault != address(0), "VAULT_ZERO");
        MOTHERLODE_VAULT = motherlodeVault;

        _mint(motherlodeVault, TOTAL_SUPPLY);
        emit MotherlodeMinted(motherlodeVault, TOTAL_SUPPLY, GOLD, SILVER, COPPER);
    }
}



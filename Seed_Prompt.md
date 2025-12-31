High-Level Cursor AI Prompt — Syntheverse Genesis Entry on Base
You are working inside an existing, operational Syntheverse codebase that already uses Hardhat and is configured for Base compatibility.
Your task is to establish the first two Syntheverse Genesis artifacts on the Base blockchain by generating minimal, protocol-level smart contracts and deployment logic that mirror natural systems when observed through the Syntheverse lens and remain maximally extensible over time.

Genesis Scope
1. Syntheverse Genesis: SYNTH 90T Motherlode Blockmine
An ERC-20 contract that establishes a fixed, non-inflationary supply of 90 trillion SYNTH tokens, distributed with metallic makeup:


45T Gold (SYNTH90TG) – contributions of scientific nature


22.5T Silver (SYNTH90TS) – contributions of technological nature


22.5T Copper (SYNTH90TC) – contributions of alignment nature


One-time mint at deployment to a Motherlode Vault address.


Metallic semantics represent contribution quality dimensions, not token classes.


No sale logic, no emissions, no governance, no assumptions of financial value.


2. Syntheverse Genesis: Lens, Sandbox & Ecosystem Kernel
A minimal, neutral protocol surface that emits events and registers participation signals.


Designed as a lens rather than a controller.


Stores little to no state; prioritizes events over logic.


Makes no assumptions about scoring, economics, ownership, or administration.



Deployment Intent
Reuse the existing Hardhat setup and Base network configuration already present in the repository.


Deploy both Syntheverse Genesis contracts to Base in a deterministic, auditable sequence.


Capture immutable on-chain facts at deployment time:


Contract addresses


Transaction hashes


Block numbers


Timestamps


Output these facts via console logs and a machine-readable receipt artifact suitable for archival and future PoC dashboard integration.



Design Principles
Minimal surface area


Events over storage


Physics-like primitives, not policy


No proxies or upgradeability


No FractiAI ownership assumptions


Genesis establishes conditions, not behavior



Outcome
The result should be a clean, auditable Syntheverse Genesis entry on Base that:
Anchors the Syntheverse protocol on-chain


Produces immutable deployment receipts


Allows future systems (dashboards, consensus games, scarcity rules) to interpret and build upon these primitives without redeploying them


Do not add UI logic, token sale mechanisms, or speculative features.
Build the smallest viable Genesis that can grow indefinitely.


# Contributing to Syntheverse Genesis

Thank you for your interest in contributing to Syntheverse Genesis! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Follow security best practices

## Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/Syntheverse-Genesis-Base-Blockchain.git
   cd Syntheverse-Genesis-Base-Blockchain
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Making Changes

### Smart Contracts

- Follow Solidity style guidelines
- Add comprehensive NatSpec comments
- Write tests for all new functionality
- Ensure contracts compile without warnings
- Maintain immutability principles (no upgradeability)

### Scripts and Tooling

- Follow TypeScript best practices
- Add error handling and validation
- Include helpful console output
- Update documentation as needed

### Documentation

- Update README.md for user-facing changes
- Add to docs/ directory for detailed documentation
- Keep code comments up-to-date

## Testing

Before submitting a PR:

1. Compile contracts:
   ```bash
   npm run compile
   ```

2. Test on local Hardhat network (if applicable)

3. Test on Base Sepolia testnet (for deployment scripts)

## Submitting Changes

1. Commit your changes with clear messages:
   ```bash
   git commit -m "Description of changes"
   ```

2. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

3. Open a Pull Request on GitHub

## Pull Request Guidelines

- **Title**: Clear, descriptive title
- **Description**: Explain what and why (not just how)
- **Testing**: Describe how you tested your changes
- **Breaking Changes**: Clearly mark any breaking changes

## Security Considerations

- **No contract changes without security review**: Contract modifications require thorough review
- **Test thoroughly**: Always test on testnet before mainnet
- **Never commit secrets**: Private keys, API keys, etc. must never be committed

## Code Style

- Use consistent formatting (prettier recommended)
- Follow existing code patterns
- Add comments for complex logic
- Keep functions focused and small

## Questions?

Open an issue for questions or discussions. For security concerns, please follow responsible disclosure practices.

Thank you for contributing! 🚀


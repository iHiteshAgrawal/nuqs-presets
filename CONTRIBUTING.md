# Contributing to nuqs-presets

Thank you for your interest in contributing to nuqs-presets! We welcome contributions from the community.

## Development Setup

1. Fork and clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run tests:
   ```bash
   npm test
   ```

4. Build the package:
   ```bash
   npm run build
   ```

## Development Workflow

1. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/my-new-feature
   ```

2. Make your changes and ensure:
   - All tests pass (`npm test`)
   - Code is properly formatted (`npm run format`)
   - No linting errors (`npm run lint`)
   - Types are correct (`npm run check-types`)

3. Create a changeset for your changes:
   ```bash
   npm run changeset
   ```
   - Select the appropriate change type (patch/minor/major)
   - Write a clear description of your changes

4. Commit your changes:
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

5. Push your branch and create a pull request

## Code Style

- Use TypeScript for all code
- Follow the existing code style (enforced by Biome)
- Write clear, concise comments only for complex logic
- Ensure all exports are properly typed

## Testing

- Write tests for all new features
- Maintain >90% code coverage
- Test edge cases and error conditions
- Use descriptive test names

## Pull Request Guidelines

- Keep PRs focused on a single feature or bugfix
- Write a clear description of the changes
- Reference any related issues
- Ensure all CI checks pass
- Be responsive to feedback

## Questions?

Feel free to open an issue for any questions or concerns!

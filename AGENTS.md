# AGENTS.md - Agent Guidelines for Naive 3D TypeScript

## Project Overview
This is a TypeScript 3D game engine project built with Vite, featuring WebGL/WebAssembly integration for high-performance linear algebra operations. The project includes both unit tests and integration tests with a custom testing framework.

## Build Commands

### Development
- `npm run dev` - Install dependencies, compile TypeScript, build, and start dev server
- `npm run build` - Install dependencies, compile TypeScript, and build for production
- `npm run preview` - Build and preview production version

### Testing
- `npm run test` - Run unit tests using naive-tests-ts framework
- `npm run test:i` - Run integration tests (builds project and starts integration test UI)
- **Single test**: Tests are defined as functions. To run a single test, temporarily modify the test array in `tests-integration/run-integration-test.ts`

### AssemblyScript (WebAssembly)
- `npm run asbuild` - Build both debug and release WASM modules
- `npm run asbuild:debug` - Build debug WASM module
- `npm run asbuild:release` - Build release WASM module

## Code Style Guidelines

### TypeScript Configuration
- Target: ES2020 with strict mode enabled
- Uses ESNext modules with bundler resolution
- Strict TypeScript settings: noUnusedLocals, noUnusedParameters, noFallthroughCasesInSwitch
- Importing TypeScript extensions is allowed

### File Structure Conventions
```
src/
├── base/           # Core engine foundations (application, scenes, game objects)
├── core/           # Low-level systems (BLAS, vectors, textures, geometry)
├── game/           # Game-specific implementation
├── editor/         # Editor-specific code
└── integration-tests-framework/  # Custom testing framework
```

### Naming Conventions
- **Files**: kebab-case (e.g., `game-object.ts`, `application-context.ts`)
- **Classes**: PascalCase (e.g., `GameObject`, `ApplicationContext`)
- **Methods/Properties**: camelCase
- **Private fields**: Use `#` prefix for true privacy (e.g., `#data`, `#length`)
- **Constants**: UPPER_SNAKE_CASE when exported as constants

### Import Organization
- Group imports by: external libraries → internal modules → relative imports
- Use named imports preferentially over default imports
- Keep import statements at the top of files, organized alphabetically within groups

### Class Design Patterns
- Use `#` private fields for true encapsulation
- Abstract base classes for extensible components (e.g., `GameObject`)
- Composition over inheritance (e.g., `GameObject` has a `Transform`)
- Factory methods for object creation where appropriate (e.g., `Vector.create()`)

### Error Handling
- Use try/catch blocks for async operations
- Type guard with `instanceof Error` for error handling
- Propagate errors appropriately in async test functions
- Avoid throwing errors in constructors; use factory methods for validation

### WebAssembly Integration
- WASM modules are in `src/core/blas/wasm/` (AssemblyScript)
- Build outputs go to `src/core/blas/wasm/build/`
- WASM files are copied to `public/` during build
- Use `ccall` for WASM function invocation

### Testing Patterns
- Unit tests use `naive-tests-ts` framework
- Integration tests use custom framework with `IntegrationTestFunction` type
- Test files end with `-test.ts` and are grouped by feature
- Integration tests use `TestLogger` for structured output
- Tests should be pure functions that accept a logger parameter

### Performance Considerations
- Use typed arrays (Uint32Array, Float32Array) for numeric data
- Prefer `requestAnimationFrame` for game loops
- WebAssembly for performance-critical linear algebra
- SharedArrayBuffer for WASM/JS data sharing where needed

### HTML/CSS Integration
- Entry points: `index.html` (main), `index-integration.html` (tests)
- Vite handles asset bundling and static copying
- Use semantic HTML5 elements

### Debugging Notes
- Integration test runner provides visual dashboard
- Use browser dev tools for WASM debugging
- TypeScript source maps available in dev mode

## Agent Behavior Guidelines
- Always run `npm run build` after making TypeScript changes to verify compilation
- Run `npm run test` before committing changes
- When adding new WebAssembly code, remember to build with `npm run asbuild`
- Follow the established folder structure when creating new files
- Use existing patterns for new classes (private fields, factory methods, etc.)
- Check `tsconfig.json` for excluded directories - WASM code is excluded from main compilation
# nuqs-presets Examples

This directory contains example applications demonstrating various use cases of the `nuqs-presets` library.

## Available Examples

### [nextjs-basic](./nextjs-basic)
A simple Next.js application demonstrating basic usage of pagination, search, and sorting hooks.

**Features:**
- Product list with pagination
- Search functionality
- Column sorting
- Simple, minimal setup

**Tech Stack:** Next.js 15, React 19, TypeScript

---

### [nextjs-ecommerce](./nextjs-ecommerce)
A comprehensive e-commerce product filtering interface with advanced features.

**Features:**
- Multi-faceted filtering (category, price range, brand, rating)
- Debounced search
- Multi-column sorting
- Filter badges with clear functionality
- Responsive design with Tailwind CSS

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, Zod

---

### [nextjs-dashboard](./nextjs-dashboard)
An admin dashboard with data tables and tab navigation.

**Features:**
- Tab-based navigation
- Data table with all features
- Date range filtering
- Multi-select functionality
- Dashboard layout

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS

---

### [react-vite](./react-vite)
A client-side React SPA built with Vite, demonstrating framework-agnostic usage.

**Features:**
- All hooks in action
- Client-side routing
- Vite for fast development
- Demonstrates non-Next.js usage

**Tech Stack:** Vite, React 19, TypeScript, React Router

---

## Running Examples

### Install dependencies

From the root of the monorepo:

```bash
npm install
```

This will install dependencies for all examples using npm workspaces.

### Run a specific example

```bash
# Next.js Basic
cd examples/nextjs-basic
npm run dev

# Next.js E-commerce
cd examples/nextjs-ecommerce
npm run dev

# Next.js Dashboard
cd examples/nextjs-dashboard
npm run dev

# React + Vite
cd examples/react-vite
npm run dev
```

### Build examples

```bash
cd examples/nextjs-basic
npm run build
npm start
```

## Development

All examples use the local `nuqs-presets` package via npm workspaces. Any changes you make to the library will be reflected in the examples after rebuilding.

```bash
# In root directory
npm run build

# Then restart your example dev server
cd examples/nextjs-basic
npm run dev
```

## Creating Your Own Example

1. Copy one of the existing examples
2. Update the `package.json` name
3. Modify the code to demonstrate your use case
4. Add a README explaining the example
5. Submit a PR!

## License

All examples are MIT licensed, same as the main library.

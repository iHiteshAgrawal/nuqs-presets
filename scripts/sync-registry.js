#!/usr/bin/env node

/**
 * Sync script to copy files from src/ to registry/default/
 * and transform imports for the shadcn registry structure.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const hooks = ['pagination', 'search', 'sorting', 'filtering', 'multi-select', 'tabs', 'date-range']

const sharedDirs = ['types', 'utils']

/**
 * Transform imports from @/ to relative paths for installed structure
 * @param {string} content - File content
 * @param {string} hookName - Hook name (e.g., 'pagination')
 * @param {string} fileName - File name (e.g., 'usePagination.ts')
 * @returns {string} - Transformed content
 */
function transformImports(content) {
  let transformed = content

  // ../../types -> ../types (from src/hooks/pagination/ to hooks/types/)
  transformed = transformed.replace(/from ['"]\.\.\/\.\.\/types['"]/g, "from '../types'")

  // ../../utils/validation -> ../../lib/utils/validation (specific file)
  transformed = transformed.replace(
    /from ['"]\.\.\/\.\.\/utils\/([^'"]+)['"]/g,
    "from '../../lib/utils/$1'"
  )

  // for now, keep as-is but this might need manual mapping
  transformed = transformed.replace(/from ['"]\.\.\/\.\.\/utils['"]/g, (match) => {
    const importMatch = content.match(/import\s+{\s*([^}]+)\s*}\s+from\s+['"]\.\.\/\.\.\/utils['"]/)
    if (importMatch) {
      const imports = importMatch[1].trim()
      // clamp -> validation.ts
      if (imports.includes('clamp')) {
        return "from '../../lib/utils/validation'"
      }
      // daysBetween -> date.ts
      if (imports.includes('daysBetween') || imports.includes('addDays')) {
        return "from '../../lib/utils/date'"
      }
      // useDebounce -> debounce.ts
      if (imports.includes('useDebounce') || imports.includes('debounce')) {
        return "from '../../lib/utils/debounce'"
      }
    }
    // Default: keep the import but point to lib/utils
    return "from '../../lib/utils'"
  })

  // Transform ../utils -> ../../lib/utils (same logic)
  transformed = transformed.replace(
    /from ['"]\.\.\/utils\/([^'"]+)['"]/g,
    "from '../../lib/utils/$1'"
  )

  transformed = transformed.replace(/from ['"]\.\.\/utils['"]/g, () => {
    const importMatch = content.match(/import\s+{\s*([^}]+)\s*}\s+from\s+['"]\.\.\/utils['"]/)
    if (importMatch) {
      const imports = importMatch[1].trim()
      if (imports.includes('clamp')) {
        return "from '../../lib/utils/validation'"
      }
      if (imports.includes('daysBetween') || imports.includes('addDays')) {
        return "from '../../lib/utils/date'"
      }
      if (imports.includes('useDebounce') || imports.includes('debounce')) {
        return "from '../../lib/utils/debounce'"
      }
    }
    return "from '../../lib/utils'"
  })

  // transform @/types -> ../types (for hooks in hooks/ folder)
  transformed = transformed.replace(/from ['"]@\/types['"]/g, "from '../types'")

  // transform @/utils/specific -> ../../lib/utils/specific
  transformed = transformed.replace(/from ['"]@\/utils\/([^'"]+)['"]/g, "from '../../lib/utils/$1'")

  // transform @/utils -> ../../lib/utils
  transformed = transformed.replace(/from ['"]@\/utils['"]/g, "from '../../lib/utils'")

  // transform @/hooks/[hook-name] -> ../[hook-name]
  transformed = transformed.replace(/from ['"]@\/hooks\/([^'"]+)['"]/g, "from '../$1'")

  return transformed
}

/**
 * Copy and transform a file
 */
function syncFile(srcPath, destPath) {
  const content = fs.readFileSync(srcPath, 'utf-8')
  const transformed = transformImports(content)

  // Ensure destination directory exists
  const destDir = path.dirname(destPath)
  fs.mkdirSync(destDir, { recursive: true })

  fs.writeFileSync(destPath, transformed, 'utf-8')
  console.log(`✓ Synced: ${path.relative(rootDir, destPath)}`)
}

/**
 * Sync hook files
 */
function syncHooks() {
  console.log('\n📦 Syncing hooks...')

  for (const hook of hooks) {
    const srcDir = path.join(rootDir, 'src/hooks', hook)
    const destDir = path.join(rootDir, 'registry/default', hook)

    // Get all .ts files in the hook directory (excluding .test.ts)
    const files = fs
      .readdirSync(srcDir)
      .filter((file) => file.endsWith('.ts') && !file.includes('.test.'))

    for (const file of files) {
      const srcPath = path.join(srcDir, file)
      const destPath = path.join(destDir, file)
      syncFile(srcPath, destPath)
    }
  }
}

/**
 * Sync shared directories (types, utils)
 */
function syncShared() {
  console.log('\n📦 Syncing shared files...')

  for (const dir of sharedDirs) {
    const srcDir = path.join(rootDir, 'src', dir)
    const destDir = path.join(rootDir, 'registry/default', dir)

    function syncDirectory(src, dest) {
      const entries = fs.readdirSync(src, { withFileTypes: true })

      for (const entry of entries) {
        const srcPath = path.join(src, entry.name)
        const destPath = path.join(dest, entry.name)

        if (entry.isDirectory()) {
          syncDirectory(srcPath, destPath)
        } else if (entry.name.endsWith('.ts') && !entry.name.includes('.test.')) {
          syncFile(srcPath, destPath, dir, entry.name)
        }
      }
    }

    syncDirectory(srcDir, destDir)
  }
}

/**
 * Sync index file
 */
function syncIndex() {
  console.log('\n📦 Syncing index...')

  const srcPath = path.join(rootDir, 'src/index.ts')
  const destPath = path.join(rootDir, 'registry/default/index.ts')

  const content = fs.readFileSync(srcPath, 'utf-8')
  const transformed = content.replace(/from ['"]\.\/hooks\//g, "from './hooks/")

  fs.writeFileSync(destPath, transformed, 'utf-8')
  console.log(`✓ Synced: ${path.relative(rootDir, destPath)}`)
}

/**
 * Main execution
 */
async function main() {
  console.log('🔄 Starting registry sync...\n')

  try {
    syncShared()
    syncHooks()
    syncIndex()

    console.log('\n✨ Sync complete!\n')
    console.log('Next steps:')
    console.log('  1. Run: npm run registry:build')
    console.log('  2. Test installation in a test project')
    console.log('')
  } catch (error) {
    console.error('\n❌ Sync failed:', error.message)
    process.exit(1)
  }
}

main()

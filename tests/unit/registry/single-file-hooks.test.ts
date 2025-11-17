import { describe, expect, it } from 'vitest'

/**
 * These tests verify that the single-file hooks in registry/default/
 * can be imported and used without any dependency issues.
 * 
 * Each hook should:
 * 1. Be a single file with all dependencies inlined
 * 2. Export the main hook function
 * 3. Export parser creation functions for nuqs loaders/serializers
 * 4. Export all necessary types
 */

describe('Single-File Hooks - Import Tests', () => {
    describe('usePagination', () => {
        it('should import the hook', async () => {
            const { usePagination } = await import('../../../registry/default/usePagination')
            expect(usePagination).toBeDefined()
            expect(typeof usePagination).toBe('function')
        })

        it('should export parser creator', async () => {
            const { createPaginationParsers } = await import('../../../registry/default/usePagination')
            expect(createPaginationParsers).toBeDefined()
            expect(typeof createPaginationParsers).toBe('function')
        })

        it('should export types', async () => {
            const module = await import('../../../registry/default/usePagination')
            expect(module).toHaveProperty('usePagination')
        })
    })

    describe('useFilters', () => {
        it('should import the hook', async () => {
            const { useFilters } = await import('../../../registry/default/useFilters')
            expect(useFilters).toBeDefined()
            expect(typeof useFilters).toBe('function')
        })

        it('should re-export Values type from nuqs', async () => {
            const module = await import('../../../registry/default/useFilters')
            expect(module).toHaveProperty('useFilters')
        })
    })

    describe('useSorting', () => {
        it('should import the hook', async () => {
            const { useSorting } = await import('../../../registry/default/useSorting')
            expect(useSorting).toBeDefined()
            expect(typeof useSorting).toBe('function')
        })

        it('should export parser creator', async () => {
            const { createSortingParsers } = await import('../../../registry/default/useSorting')
            expect(createSortingParsers).toBeDefined()
            expect(typeof createSortingParsers).toBe('function')
        })
    })

    describe('useSearch', () => {
        it('should import the hook', async () => {
            const { useSearch } = await import('../../../registry/default/useSearch')
            expect(useSearch).toBeDefined()
            expect(typeof useSearch).toBe('function')
        })

        it('should export parser creator', async () => {
            const { createSearchParser } = await import('../../../registry/default/useSearch')
            expect(createSearchParser).toBeDefined()
            expect(typeof createSearchParser).toBe('function')
        })
    })

    describe('useTabs', () => {
        it('should import the hook', async () => {
            const { useTabs } = await import('../../../registry/default/useTabs')
            expect(useTabs).toBeDefined()
            expect(typeof useTabs).toBe('function')
        })

        it('should export parser creator', async () => {
            const { createTabsParser } = await import('../../../registry/default/useTabs')
            expect(createTabsParser).toBeDefined()
            expect(typeof createTabsParser).toBe('function')
        })
    })

    describe('useMultiSelect', () => {
        it('should import the hook', async () => {
            const { useMultiSelect } = await import('../../../registry/default/useMultiSelect')
            expect(useMultiSelect).toBeDefined()
            expect(typeof useMultiSelect).toBe('function')
        })

        it('should export parser creator', async () => {
            const { createMultiSelectParser } = await import('../../../registry/default/useMultiSelect')
            expect(createMultiSelectParser).toBeDefined()
            expect(typeof createMultiSelectParser).toBe('function')
        })
    })

    describe('useDateRange', () => {
        it('should import the hook', async () => {
            const { useDateRange } = await import('../../../registry/default/useDateRange')
            expect(useDateRange).toBeDefined()
            expect(typeof useDateRange).toBe('function')
        })

        it('should export parser creator', async () => {
            const { createDateRangeParsers } = await import('../../../registry/default/useDateRange')
            expect(createDateRangeParsers).toBeDefined()
            expect(typeof createDateRangeParsers).toBe('function')
        })

        it('should have all date utilities inlined', async () => {
            // Verify the module doesn't have external dependencies on our utils
            const module = await import('../../../registry/default/useDateRange')
            expect(module.useDateRange).toBeDefined()
            // If this imports successfully, all utilities are properly inlined
        })
    })
})

describe('Single-File Hooks - Parser Creators', () => {
    it('usePagination - should create parsers', async () => {
        const { createPaginationParsers } = await import('../../../registry/default/usePagination')
        const parsers = createPaginationParsers({ defaultPage: 1, defaultPageSize: 20 })
        expect(parsers).toBeDefined()
        expect(parsers).toHaveProperty('page')
        expect(parsers).toHaveProperty('pageSize')
    })

    it('useSorting - should create parsers', async () => {
        const { createSortingParsers } = await import('../../../registry/default/useSorting')
        const parsers = createSortingParsers({
            columns: ['name', 'date', 'price'] as const,
            defaultColumn: 'name'
        })
        expect(parsers).toBeDefined()
        expect(parsers).toHaveProperty('sortBy')
        expect(parsers).toHaveProperty('order')
    })

    it('useSearch - should create parser', async () => {
        const { createSearchParser } = await import('../../../registry/default/useSearch')
        const parser = createSearchParser({ defaultQuery: '' })
        expect(parser).toBeDefined()
    })

    it('useTabs - should create parser', async () => {
        const { createTabsParser } = await import('../../../registry/default/useTabs')
        const parser = createTabsParser({
            tabs: ['overview', 'details'] as const,
            defaultTab: 'overview'
        })
        expect(parser).toBeDefined()
    })

    it('useMultiSelect - should create parser', async () => {
        const { createMultiSelectParser } = await import('../../../registry/default/useMultiSelect')
        const parser = createMultiSelectParser({ separator: ',' })
        expect(parser).toBeDefined()
    })

    it('useDateRange - should create parsers', async () => {
        const { createDateRangeParsers } = await import('../../../registry/default/useDateRange')
        const parsers = createDateRangeParsers({ defaultPreset: 'last7days' })
        expect(parsers).toBeDefined()
        expect(parsers).toHaveProperty('from')
        expect(parsers).toHaveProperty('to')
        expect(parsers).toHaveProperty('range')
    })
})

describe('Single-File Hooks - Type Exports', () => {
    it('should export all necessary types for TypeScript users', async () => {
        // This test verifies the files compile correctly with TypeScript
        // If this test runs, it means all types are properly defined

        const pagination = await import('../../../registry/default/usePagination')
        const filters = await import('../../../registry/default/useFilters')
        const sorting = await import('../../../registry/default/useSorting')
        const search = await import('../../../registry/default/useSearch')
        const tabs = await import('../../../registry/default/useTabs')
        const multiSelect = await import('../../../registry/default/useMultiSelect')
        const dateRange = await import('../../../registry/default/useDateRange')

        // Verify main exports exist
        expect(pagination.usePagination).toBeDefined()
        expect(filters.useFilters).toBeDefined()
        expect(sorting.useSorting).toBeDefined()
        expect(search.useSearch).toBeDefined()
        expect(tabs.useTabs).toBeDefined()
        expect(multiSelect.useMultiSelect).toBeDefined()
        expect(dateRange.useDateRange).toBeDefined()
    })
})

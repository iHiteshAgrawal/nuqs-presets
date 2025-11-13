import { useMultiSelect, usePagination, useSearch, useSorting } from 'nuqs-presets'
import { useMemo } from 'react'
import { ALL_TAGS, articles } from '../data/articles'

export function ArticleList() {
  const { query, setQuery, debouncedQuery } = useSearch({
    debounce: 300,
    minLength: 1,
  })

  const {
    selected: selectedTags,
    toggle,
    deselectAll,
    isSelected,
  } = useMultiSelect({
    allItems: ALL_TAGS,
  })

  const { sortBy, sortOrder, toggleSort, getSortIndicator } = useSorting({
    columns: ['title', 'date', 'readTime'] as const,
  })

  const filteredAndSorted = useMemo(() => {
    let result = articles

    if (debouncedQuery) {
      const searchLower = debouncedQuery.toLowerCase()
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(searchLower) ||
          a.content.toLowerCase().includes(searchLower) ||
          a.author.toLowerCase().includes(searchLower)
      )
    }

    if (selectedTags.length > 0) {
      result = result.filter((a) => a.tags.some((tag) => selectedTags.includes(tag)))
    }

    if (sortBy && sortOrder) {
      result = [...result].sort((a, b) => {
        const aVal = a[sortBy]
        const bVal = b[sortBy]

        if (sortBy === 'date') {
          const diff = new Date(aVal).getTime() - new Date(bVal).getTime()
          return sortOrder === 'asc' ? diff : -diff
        }

        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortOrder === 'asc' ? aVal - bVal : bVal - aVal
        }

        const strA = String(aVal).toLowerCase()
        const strB = String(bVal).toLowerCase()
        const comparison = strA.localeCompare(strB)
        return sortOrder === 'asc' ? comparison : -comparison
      })
    }

    return result
  }, [debouncedQuery, selectedTags, sortBy, sortOrder])

  const { page, pageSize, setPageSize, offset, hasNextPage, hasPrevPage, nextPage, prevPage } =
    usePagination({
      defaultPageSize: 5,
      totalItems: filteredAndSorted.length,
    })

  const paginatedArticles = filteredAndSorted.slice(offset, offset + pageSize)

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          Blog Articles
        </h1>
        <p style={{ fontSize: '1.125rem', opacity: 0.8 }}>
          Framework-agnostic example with React Router
        </p>
      </header>

      <div style={{ marginBottom: '2rem' }}>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles..."
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            fontSize: '1rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
          }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          marginBottom: '2rem',
          alignItems: 'center',
        }}
      >
        <span style={{ fontWeight: '600' }}>Tags:</span>
        {ALL_TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => toggle(tag)}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.875rem',
              borderRadius: '0.375rem',
              border: 'none',
              backgroundColor: isSelected(tag) ? '#2563eb' : '#e5e7eb',
              color: isSelected(tag) ? '#ffffff' : '#1f2937',
              transition: 'all 0.2s',
            }}
          >
            {tag}
          </button>
        ))}
        {selectedTags.length > 0 && (
          <button
            type="button"
            onClick={deselectAll}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.875rem',
              color: '#2563eb',
              background: 'none',
              border: 'none',
              textDecoration: 'underline',
            }}
          >
            Clear all
          </button>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button type="button" onClick={() => toggleSort('title')} style={sortButtonStyle}>
            Title {getSortIndicator('title')}
          </button>
          <button type="button" onClick={() => toggleSort('date')} style={sortButtonStyle}>
            Date {getSortIndicator('date')}
          </button>
          <button type="button" onClick={() => toggleSort('readTime')} style={sortButtonStyle}>
            Read Time {getSortIndicator('readTime')}
          </button>
        </div>

        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          style={{
            padding: '0.5rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
          }}
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
        </select>
      </div>

      {filteredAndSorted.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <p style={{ fontSize: '1.25rem', opacity: 0.6 }}>No articles found</p>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {paginatedArticles.map((article) => (
              <article
                key={article.id}
                style={{
                  padding: '1.5rem',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                }}
              >
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  {article.title}
                </h2>
                <div
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    fontSize: '0.875rem',
                    opacity: 0.7,
                    marginBottom: '0.75rem',
                  }}
                >
                  <span>{article.author}</span>
                  <span>•</span>
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime} min read</span>
                </div>
                <p style={{ marginBottom: '1rem', opacity: 0.9 }}>{article.content}</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: '0.25rem 0.75rem',
                        fontSize: '0.75rem',
                        backgroundColor: '#dbeafe',
                        color: '#1e40af',
                        borderRadius: '9999px',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '2rem',
            }}
          >
            <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>
              Showing {offset + 1} to {Math.min(offset + pageSize, filteredAndSorted.length)} of{' '}
              {filteredAndSorted.length} articles
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={prevPage}
                disabled={!hasPrevPage}
                style={paginationButtonStyle}
              >
                Previous
              </button>
              <span style={{ padding: '0.5rem 1rem' }}>Page {page}</span>
              <button
                type="button"
                onClick={nextPage}
                disabled={!hasNextPage}
                style={paginationButtonStyle}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

const sortButtonStyle: React.CSSProperties = {
  padding: '0.5rem 1rem',
  border: '1px solid #d1d5db',
  borderRadius: '0.375rem',
  backgroundColor: '#ffffff',
  fontSize: '0.875rem',
}

const paginationButtonStyle: React.CSSProperties = {
  padding: '0.5rem 1rem',
  border: '1px solid #d1d5db',
  borderRadius: '0.375rem',
  backgroundColor: '#ffffff',
  fontSize: '0.875rem',
  cursor: 'pointer',
}

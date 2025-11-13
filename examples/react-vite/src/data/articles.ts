export interface Article {
  id: string
  title: string
  content: string
  author: string
  date: string
  tags: string[]
  readTime: number
}

export const articles: Article[] = [
  {
    id: '1',
    title: 'Getting Started with React 19',
    content: 'Learn about the new features and improvements in React 19...',
    author: 'Sarah Johnson',
    date: '2024-03-15',
    tags: ['React', 'JavaScript', 'Tutorial'],
    readTime: 5,
  },
  {
    id: '2',
    title: 'TypeScript Best Practices',
    content: 'Discover essential TypeScript patterns for better code quality...',
    author: 'Michael Chen',
    date: '2024-03-10',
    tags: ['TypeScript', 'Best Practices', 'Programming'],
    readTime: 8,
  },
  {
    id: '3',
    title: 'Understanding URL State Management',
    content: 'A deep dive into managing application state through URLs...',
    author: 'Emily Rodriguez',
    date: '2024-03-08',
    tags: ['React', 'State Management', 'URLs'],
    readTime: 10,
  },
  {
    id: '4',
    title: 'Building Scalable Web Applications',
    content: 'Learn architectural patterns for building large-scale apps...',
    author: 'David Kim',
    date: '2024-03-05',
    tags: ['Architecture', 'JavaScript', 'Best Practices'],
    readTime: 12,
  },
  {
    id: '5',
    title: 'Modern CSS Techniques',
    content: 'Explore the latest CSS features and how to use them...',
    author: 'Lisa Anderson',
    date: '2024-03-01',
    tags: ['CSS', 'Web Design', 'Frontend'],
    readTime: 6,
  },
  {
    id: '6',
    title: 'Testing React Components',
    content: 'Comprehensive guide to testing React applications...',
    author: 'James Wilson',
    date: '2024-02-28',
    tags: ['React', 'Testing', 'Jest'],
    readTime: 15,
  },
  {
    id: '7',
    title: 'Performance Optimization Tips',
    content: 'Practical techniques to improve web application performance...',
    author: 'Maria Garcia',
    date: '2024-02-25',
    tags: ['Performance', 'JavaScript', 'Optimization'],
    readTime: 9,
  },
  {
    id: '8',
    title: 'Introduction to Web Accessibility',
    content: 'Making your websites accessible to everyone...',
    author: 'Robert Taylor',
    date: '2024-02-20',
    tags: ['Accessibility', 'HTML', 'Best Practices'],
    readTime: 7,
  },
  {
    id: '9',
    title: 'State Management Patterns',
    content: 'Comparing different state management approaches in React...',
    author: 'Jennifer Lee',
    date: '2024-02-15',
    tags: ['React', 'State Management', 'Patterns'],
    readTime: 11,
  },
  {
    id: '10',
    title: 'Building Progressive Web Apps',
    content: 'Creating offline-capable applications with PWA features...',
    author: 'Thomas Brown',
    date: '2024-02-10',
    tags: ['PWA', 'JavaScript', 'Mobile'],
    readTime: 13,
  },
]

export const ALL_TAGS = [...new Set(articles.flatMap((a) => a.tags))].sort()

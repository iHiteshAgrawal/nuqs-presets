import { z } from 'zod'

export const filterSchema = z.object({
  categories: z.array(z.enum(['Electronics', 'Clothing', 'Books', 'Home & Garden'])).optional(),
  brands: z.array(z.string()).optional(),
  minPrice: z.number().min(0).max(10000).optional(),
  maxPrice: z.number().min(0).max(10000).optional(),
  minRating: z.number().min(0).max(5).optional(),
  inStock: z.boolean().optional(),
})

export type FilterSchema = z.infer<typeof filterSchema>

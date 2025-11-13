export interface Product {
  id: number
  name: string
  description: string
  price: number
  category: 'Electronics' | 'Clothing' | 'Books' | 'Home & Garden'
  brand: string
  rating: number
  inStock: boolean
  image: string
}

export const products: Product[] = [
  // Electronics - Apple
  { id: 1, name: 'MacBook Pro 16"', description: 'Powerful laptop for professionals', price: 2499, category: 'Electronics', brand: 'Apple', rating: 4.8, inStock: true, image: '📱' },
  { id: 2, name: 'iPhone 15 Pro', description: 'Latest flagship smartphone', price: 999, category: 'Electronics', brand: 'Apple', rating: 4.7, inStock: true, image: '📱' },
  { id: 3, name: 'iPad Air', description: 'Versatile tablet for work and play', price: 599, category: 'Electronics', brand: 'Apple', rating: 4.6, inStock: true, image: '📱' },
  { id: 4, name: 'AirPods Pro', description: 'Premium wireless earbuds', price: 249, category: 'Electronics', brand: 'Apple', rating: 4.5, inStock: true, image: '🎧' },
  { id: 5, name: 'Apple Watch Series 9', description: 'Advanced fitness tracker', price: 429, category: 'Electronics', brand: 'Apple', rating: 4.7, inStock: true, image: '⌚' },

  // Electronics - Samsung
  { id: 6, name: 'Samsung Galaxy S24 Ultra', description: 'Premium Android flagship', price: 1199, category: 'Electronics', brand: 'Samsung', rating: 4.6, inStock: true, image: '📱' },
  { id: 7, name: 'Samsung 55" QLED TV', description: '4K smart TV with quantum dot', price: 799, category: 'Electronics', brand: 'Samsung', rating: 4.5, inStock: true, image: '📺' },
  { id: 8, name: 'Galaxy Buds Pro', description: 'Wireless earbuds with ANC', price: 199, category: 'Electronics', brand: 'Samsung', rating: 4.4, inStock: false, image: '🎧' },
  { id: 9, name: 'Samsung Monitor 27"', description: 'High-resolution display', price: 349, category: 'Electronics', brand: 'Samsung', rating: 4.5, inStock: true, image: '🖥️' },
  { id: 10, name: 'Galaxy Watch 6', description: 'Feature-rich smartwatch', price: 299, category: 'Electronics', brand: 'Samsung', rating: 4.4, inStock: true, image: '⌚' },

  // Electronics - Sony
  { id: 11, name: 'Sony WH-1000XM5', description: 'Industry-leading ANC headphones', price: 399, category: 'Electronics', brand: 'Sony', rating: 4.8, inStock: true, image: '🎧' },
  { id: 12, name: 'PlayStation 5', description: 'Next-gen gaming console', price: 499, category: 'Electronics', brand: 'Sony', rating: 4.7, inStock: false, image: '🎮' },
  { id: 13, name: 'Sony A7 IV Camera', description: 'Professional mirrorless camera', price: 2498, category: 'Electronics', brand: 'Sony', rating: 4.9, inStock: true, image: '📷' },
  { id: 14, name: 'Sony Bravia 65" OLED', description: 'Premium OLED television', price: 1999, category: 'Electronics', brand: 'Sony', rating: 4.8, inStock: true, image: '📺' },
  { id: 15, name: 'Sony Linkbuds S', description: 'Compact wireless earbuds', price: 178, category: 'Electronics', brand: 'Sony', rating: 4.3, inStock: true, image: '🎧' },

  // Electronics - Dell
  { id: 16, name: 'Dell XPS 15', description: 'Premium ultrabook', price: 1699, category: 'Electronics', brand: 'Dell', rating: 4.6, inStock: true, image: '💻' },
  { id: 17, name: 'Dell Ultrasharp Monitor', description: '27" 4K IPS display', price: 549, category: 'Electronics', brand: 'Dell', rating: 4.5, inStock: true, image: '🖥️' },
  { id: 18, name: 'Dell Latitude Laptop', description: 'Business-grade laptop', price: 1299, category: 'Electronics', brand: 'Dell', rating: 4.4, inStock: true, image: '💻' },

  // Electronics - HP
  { id: 19, name: 'HP Envy Desktop', description: 'Powerful desktop computer', price: 999, category: 'Electronics', brand: 'HP', rating: 4.3, inStock: true, image: '🖥️' },
  { id: 20, name: 'HP OfficeJet Printer', description: 'All-in-one wireless printer', price: 199, category: 'Electronics', brand: 'HP', rating: 4.2, inStock: true, image: '🖨️' },
  { id: 21, name: 'HP Chromebook', description: 'Affordable laptop', price: 449, category: 'Electronics', brand: 'HP', rating: 4.1, inStock: true, image: '💻' },

  // Electronics - Logitech
  { id: 22, name: 'Logitech MX Master 3S', description: 'Premium wireless mouse', price: 99, category: 'Electronics', brand: 'Logitech', rating: 4.7, inStock: true, image: '🖱️' },
  { id: 23, name: 'Logitech MX Keys', description: 'Wireless mechanical keyboard', price: 119, category: 'Electronics', brand: 'Logitech', rating: 4.6, inStock: true, image: '⌨️' },
  { id: 24, name: 'Logitech C920 Webcam', description: 'HD video camera', price: 79, category: 'Electronics', brand: 'Logitech', rating: 4.5, inStock: true, image: '📹' },
  { id: 25, name: 'Logitech G Pro Headset', description: 'Gaming headset', price: 129, category: 'Electronics', brand: 'Logitech', rating: 4.4, inStock: true, image: '🎧' },

  // Clothing - Nike
  { id: 26, name: 'Nike Air Max 270', description: 'Classic sneakers', price: 150, category: 'Clothing', brand: 'Nike', rating: 4.6, inStock: true, image: '👟' },
  { id: 27, name: 'Nike Dri-FIT Shirt', description: 'Performance athletic shirt', price: 35, category: 'Clothing', brand: 'Nike', rating: 4.4, inStock: true, image: '👕' },
  { id: 28, name: 'Nike Running Shorts', description: 'Lightweight running shorts', price: 40, category: 'Clothing', brand: 'Nike', rating: 4.3, inStock: true, image: '🩳' },
  { id: 29, name: 'Nike Hoodie', description: 'Comfortable fleece hoodie', price: 65, category: 'Clothing', brand: 'Nike', rating: 4.5, inStock: true, image: '🧥' },
  { id: 30, name: 'Nike Backpack', description: 'Durable sports backpack', price: 55, category: 'Clothing', brand: 'Nike', rating: 4.4, inStock: true, image: '🎒' },

  // Clothing - Adidas
  { id: 31, name: 'Adidas Ultraboost', description: 'Premium running shoes', price: 180, category: 'Clothing', brand: 'Adidas', rating: 4.7, inStock: true, image: '👟' },
  { id: 32, name: 'Adidas Track Pants', description: 'Classic three-stripe pants', price: 60, category: 'Clothing', brand: 'Adidas', rating: 4.5, inStock: true, image: '👖' },
  { id: 33, name: 'Adidas Jersey', description: 'Soccer training jersey', price: 45, category: 'Clothing', brand: 'Adidas', rating: 4.4, inStock: true, image: '👕' },
  { id: 34, name: 'Adidas Cap', description: 'Sports baseball cap', price: 25, category: 'Clothing', brand: 'Adidas', rating: 4.3, inStock: true, image: '🧢' },
  { id: 35, name: 'Adidas Gym Bag', description: 'Spacious duffel bag', price: 50, category: 'Clothing', brand: 'Adidas', rating: 4.5, inStock: true, image: '💼' },

  // Clothing - Levi's
  { id: 36, name: "Levi's 501 Jeans", description: 'Classic straight fit jeans', price: 89, category: 'Clothing', brand: "Levi's", rating: 4.6, inStock: true, image: '👖' },
  { id: 37, name: "Levi's Denim Jacket", description: 'Timeless denim jacket', price: 98, category: 'Clothing', brand: "Levi's", rating: 4.7, inStock: true, image: '🧥' },
  { id: 38, name: "Levi's T-Shirt Pack", description: '3-pack basic tees', price: 39, category: 'Clothing', brand: "Levi's", rating: 4.4, inStock: true, image: '👕' },
  { id: 39, name: "Levi's Belt", description: 'Leather belt', price: 35, category: 'Clothing', brand: "Levi's", rating: 4.3, inStock: true, image: '👔' },

  // Clothing - Zara
  { id: 40, name: 'Zara Blazer', description: 'Professional blazer', price: 129, category: 'Clothing', brand: 'Zara', rating: 4.3, inStock: true, image: '🧥' },
  { id: 41, name: 'Zara Dress', description: 'Elegant evening dress', price: 79, category: 'Clothing', brand: 'Zara', rating: 4.4, inStock: true, image: '👗' },
  { id: 42, name: 'Zara Trousers', description: 'Tailored office pants', price: 49, category: 'Clothing', brand: 'Zara', rating: 4.2, inStock: true, image: '👖' },
  { id: 43, name: 'Zara Scarf', description: 'Fashionable scarf', price: 29, category: 'Clothing', brand: 'Zara', rating: 4.1, inStock: true, image: '🧣' },

  // Clothing - H&M
  { id: 44, name: 'H&M Sweater', description: 'Cozy knit sweater', price: 39, category: 'Clothing', brand: 'H&M', rating: 4.2, inStock: true, image: '🧶' },
  { id: 45, name: 'H&M Chinos', description: 'Casual chino pants', price: 34, category: 'Clothing', brand: 'H&M', rating: 4.1, inStock: true, image: '👖' },
  { id: 46, name: 'H&M Shirt', description: 'Cotton button-down shirt', price: 29, category: 'Clothing', brand: 'H&M', rating: 4.0, inStock: true, image: '👔' },

  // Books - Penguin
  { id: 47, name: '1984 by George Orwell', description: 'Classic dystopian novel', price: 15, category: 'Books', brand: 'Penguin', rating: 4.8, inStock: true, image: '📚' },
  { id: 48, name: 'To Kill a Mockingbird', description: 'American classic', price: 14, category: 'Books', brand: 'Penguin', rating: 4.9, inStock: true, image: '📚' },
  { id: 49, name: 'Pride and Prejudice', description: 'Jane Austen romance', price: 12, category: 'Books', brand: 'Penguin', rating: 4.7, inStock: true, image: '📚' },
  { id: 50, name: 'The Great Gatsby', description: 'Jazz age masterpiece', price: 13, category: 'Books', brand: 'Penguin', rating: 4.6, inStock: true, image: '📚' },

  // Books - O'Reilly
  { id: 51, name: 'JavaScript: The Good Parts', description: 'Essential JS guide', price: 39, category: 'Books', brand: "O'Reilly", rating: 4.5, inStock: true, image: '📘' },
  { id: 52, name: 'Learning React', description: 'Modern React development', price: 49, category: 'Books', brand: "O'Reilly", rating: 4.6, inStock: true, image: '📘' },
  { id: 53, name: 'Python for Data Analysis', description: 'Data science with Python', price: 59, category: 'Books', brand: "O'Reilly", rating: 4.7, inStock: true, image: '📘' },
  { id: 54, name: 'Designing Data-Intensive Apps', description: 'System design guide', price: 69, category: 'Books', brand: "O'Reilly", rating: 4.8, inStock: true, image: '📘' },
  { id: 55, name: 'Clean Code', description: 'Software craftsmanship', price: 45, category: 'Books', brand: "O'Reilly", rating: 4.7, inStock: true, image: '📘' },

  // Books - Manning
  { id: 56, name: 'Node.js in Action', description: 'Comprehensive Node.js guide', price: 54, category: 'Books', brand: 'Manning', rating: 4.5, inStock: true, image: '📕' },
  { id: 57, name: 'Spring in Action', description: 'Spring framework guide', price: 59, category: 'Books', brand: 'Manning', rating: 4.6, inStock: true, image: '📕' },
  { id: 58, name: 'Docker in Practice', description: 'Container mastery', price: 49, category: 'Books', brand: 'Manning', rating: 4.5, inStock: true, image: '📕' },

  // Books - Apress
  { id: 59, name: 'Pro TypeScript', description: 'Advanced TypeScript', price: 44, category: 'Books', brand: 'Apress', rating: 4.4, inStock: true, image: '📙' },
  { id: 60, name: 'Beginning React', description: 'React fundamentals', price: 39, category: 'Books', brand: 'Apress', rating: 4.3, inStock: true, image: '📙' },
  { id: 61, name: 'Pro Git', description: 'Git version control', price: 34, category: 'Books', brand: 'Apress', rating: 4.6, inStock: true, image: '📙' },

  // Books - HarperCollins
  { id: 62, name: 'The Hobbit', description: 'Fantasy adventure', price: 18, category: 'Books', brand: 'HarperCollins', rating: 4.8, inStock: true, image: '📚' },
  { id: 63, name: 'The Chronicles of Narnia', description: 'Fantasy series', price: 22, category: 'Books', brand: 'HarperCollins', rating: 4.7, inStock: true, image: '📚' },
  { id: 64, name: 'Where the Crawdads Sing', description: 'Bestselling mystery', price: 16, category: 'Books', brand: 'HarperCollins', rating: 4.5, inStock: true, image: '📚' },

  // Home & Garden - IKEA
  { id: 65, name: 'IKEA Desk Lamp', description: 'Modern LED lamp', price: 29, category: 'Home & Garden', brand: 'IKEA', rating: 4.3, inStock: true, image: '💡' },
  { id: 66, name: 'IKEA Office Chair', description: 'Ergonomic desk chair', price: 179, category: 'Home & Garden', brand: 'IKEA', rating: 4.4, inStock: true, image: '🪑' },
  { id: 67, name: 'IKEA Bookshelf', description: 'Versatile storage shelf', price: 89, category: 'Home & Garden', brand: 'IKEA', rating: 4.5, inStock: true, image: '📚' },
  { id: 68, name: 'IKEA Bed Frame', description: 'Queen size bed', price: 299, category: 'Home & Garden', brand: 'IKEA', rating: 4.4, inStock: true, image: '🛏️' },
  { id: 69, name: 'IKEA Coffee Table', description: 'Minimalist table', price: 79, category: 'Home & Garden', brand: 'IKEA', rating: 4.3, inStock: true, image: '🪑' },
  { id: 70, name: 'IKEA Plant Pot', description: 'Ceramic planter', price: 15, category: 'Home & Garden', brand: 'IKEA', rating: 4.2, inStock: true, image: '🪴' },

  // Home & Garden - KitchenAid
  { id: 71, name: 'KitchenAid Stand Mixer', description: 'Professional mixer', price: 449, category: 'Home & Garden', brand: 'KitchenAid', rating: 4.8, inStock: true, image: '🍳' },
  { id: 72, name: 'KitchenAid Blender', description: 'Powerful blender', price: 199, category: 'Home & Garden', brand: 'KitchenAid', rating: 4.6, inStock: true, image: '🍳' },
  { id: 73, name: 'KitchenAid Food Processor', description: 'Multi-function processor', price: 249, category: 'Home & Garden', brand: 'KitchenAid', rating: 4.7, inStock: true, image: '🍳' },
  { id: 74, name: 'KitchenAid Toaster', description: '4-slice toaster', price: 129, category: 'Home & Garden', brand: 'KitchenAid', rating: 4.5, inStock: true, image: '🍞' },

  // Home & Garden - Dyson
  { id: 75, name: 'Dyson V15 Vacuum', description: 'Cordless stick vacuum', price: 649, category: 'Home & Garden', brand: 'Dyson', rating: 4.7, inStock: true, image: '🧹' },
  { id: 76, name: 'Dyson Air Purifier', description: 'HEPA air purifier', price: 549, category: 'Home & Garden', brand: 'Dyson', rating: 4.6, inStock: true, image: '💨' },
  { id: 77, name: 'Dyson Hair Dryer', description: 'Professional hair dryer', price: 429, category: 'Home & Garden', brand: 'Dyson', rating: 4.5, inStock: false, image: '💇' },
  { id: 78, name: 'Dyson Fan', description: 'Bladeless tower fan', price: 399, category: 'Home & Garden', brand: 'Dyson', rating: 4.4, inStock: true, image: '💨' },

  // Home & Garden - Philips
  { id: 79, name: 'Philips Hue Starter Kit', description: 'Smart lighting system', price: 199, category: 'Home & Garden', brand: 'Philips', rating: 4.6, inStock: true, image: '💡' },
  { id: 80, name: 'Philips Air Fryer', description: 'Healthy cooking appliance', price: 199, category: 'Home & Garden', brand: 'Philips', rating: 4.5, inStock: true, image: '🍳' },
  { id: 81, name: 'Philips Electric Shaver', description: 'Precision shaving', price: 149, category: 'Home & Garden', brand: 'Philips', rating: 4.4, inStock: true, image: '🪒' },
  { id: 82, name: 'Philips Coffee Maker', description: 'Automatic coffee machine', price: 299, category: 'Home & Garden', brand: 'Philips', rating: 4.5, inStock: true, image: '☕' },

  // Home & Garden - Bosch
  { id: 83, name: 'Bosch Dishwasher', description: 'Quiet dishwasher', price: 799, category: 'Home & Garden', brand: 'Bosch', rating: 4.7, inStock: true, image: '🍽️' },
  { id: 84, name: 'Bosch Drill Set', description: 'Power tool kit', price: 159, category: 'Home & Garden', brand: 'Bosch', rating: 4.6, inStock: true, image: '🔨' },
  { id: 85, name: 'Bosch Washing Machine', description: 'Front-load washer', price: 899, category: 'Home & Garden', brand: 'Bosch', rating: 4.5, inStock: true, image: '🧺' },

  // Additional Electronics
  { id: 86, name: 'Bose QuietComfort Headphones', description: 'Premium ANC headphones', price: 349, category: 'Electronics', brand: 'Bose', rating: 4.6, inStock: true, image: '🎧' },
  { id: 87, name: 'Canon EOS R6', description: 'Mirrorless camera', price: 2499, category: 'Electronics', brand: 'Canon', rating: 4.8, inStock: true, image: '📷' },
  { id: 88, name: 'GoPro Hero 12', description: 'Action camera', price: 399, category: 'Electronics', brand: 'GoPro', rating: 4.5, inStock: true, image: '📹' },
  { id: 89, name: 'Kindle Paperwhite', description: 'E-reader', price: 139, category: 'Electronics', brand: 'Amazon', rating: 4.6, inStock: true, image: '📱' },
  { id: 90, name: 'Nintendo Switch', description: 'Gaming console', price: 299, category: 'Electronics', brand: 'Nintendo', rating: 4.7, inStock: true, image: '🎮' },

  // Additional Clothing
  { id: 91, name: 'Patagonia Fleece Jacket', description: 'Outdoor fleece', price: 149, category: 'Clothing', brand: 'Patagonia', rating: 4.7, inStock: true, image: '🧥' },
  { id: 92, name: 'The North Face Backpack', description: 'Hiking backpack', price: 129, category: 'Clothing', brand: 'The North Face', rating: 4.6, inStock: true, image: '🎒' },
  { id: 93, name: 'Under Armour Compression Shirt', description: 'Athletic wear', price: 45, category: 'Clothing', brand: 'Under Armour', rating: 4.4, inStock: true, image: '👕' },
  { id: 94, name: 'Puma Running Shoes', description: 'Performance sneakers', price: 110, category: 'Clothing', brand: 'Puma', rating: 4.3, inStock: true, image: '👟' },
  { id: 95, name: 'Columbia Rain Jacket', description: 'Waterproof jacket', price: 99, category: 'Clothing', brand: 'Columbia', rating: 4.5, inStock: true, image: '🧥' },

  // Additional Books
  { id: 96, name: 'Atomic Habits', description: 'Self-improvement guide', price: 27, category: 'Books', brand: 'Random House', rating: 4.8, inStock: true, image: '📚' },
  { id: 97, name: 'Sapiens', description: 'Human history', price: 24, category: 'Books', brand: 'Random House', rating: 4.7, inStock: true, image: '📚' },
  { id: 98, name: 'Thinking, Fast and Slow', description: 'Psychology bestseller', price: 20, category: 'Books', brand: 'Penguin', rating: 4.6, inStock: true, image: '📚' },
  { id: 99, name: 'The Lean Startup', description: 'Business methodology', price: 28, category: 'Books', brand: 'Random House', rating: 4.5, inStock: true, image: '📚' },
  { id: 100, name: 'Zero to One', description: 'Startup insights', price: 25, category: 'Books', brand: 'Random House', rating: 4.6, inStock: true, image: '📚' },

  // Additional Home & Garden
  { id: 101, name: 'Instant Pot', description: 'Multi-function cooker', price: 99, category: 'Home & Garden', brand: 'Instant Pot', rating: 4.7, inStock: true, image: '🍳' },
  { id: 102, name: 'Ninja Blender', description: 'Professional blender', price: 149, category: 'Home & Garden', brand: 'Ninja', rating: 4.5, inStock: true, image: '🍳' },
  { id: 103, name: 'Roomba Robot Vacuum', description: 'Smart robot vacuum', price: 599, category: 'Home & Garden', brand: 'iRobot', rating: 4.4, inStock: true, image: '🤖' },
  { id: 104, name: 'Nest Thermostat', description: 'Smart thermostat', price: 249, category: 'Home & Garden', brand: 'Google', rating: 4.6, inStock: true, image: '🌡️' },
  { id: 105, name: 'Ring Doorbell', description: 'Smart video doorbell', price: 199, category: 'Home & Garden', brand: 'Ring', rating: 4.5, inStock: true, image: '🔔' },
]

export function getFilteredProducts(filters: {
  categories?: string[]
  brands?: string[]
  minPrice?: number
  maxPrice?: number
  minRating?: number
  inStock?: boolean
  search?: string
}) {
  return products.filter((product) => {
    if (filters.categories?.length && !filters.categories.includes(product.category)) {
      return false
    }
    if (filters.brands?.length && !filters.brands.includes(product.brand)) {
      return false
    }
    if (filters.minPrice !== undefined && product.price < filters.minPrice) {
      return false
    }
    if (filters.maxPrice !== undefined && product.price > filters.maxPrice) {
      return false
    }
    if (filters.minRating !== undefined && product.rating < filters.minRating) {
      return false
    }
    if (filters.inStock !== undefined && product.inStock !== filters.inStock) {
      return false
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      return (
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower)
      )
    }
    return true
  })
}

export const BRANDS = ['Apple', 'Samsung', 'Sony', 'Dell', 'HP', 'Logitech', 'Nike', 'Adidas', "Levi's", 'Zara', 'H&M', 'Penguin', "O'Reilly", 'Manning', 'Apress', 'HarperCollins', 'IKEA', 'KitchenAid', 'Dyson', 'Philips', 'Bosch', 'Other'] as const

export const CATEGORIES = ['Electronics', 'Clothing', 'Books', 'Home & Garden'] as const

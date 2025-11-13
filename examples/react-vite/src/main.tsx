import { NuqsAdapter } from 'nuqs/adapters/react-router'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ArticleList } from './routes/articles'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <NuqsAdapter>
        <Routes>
          <Route path="/" element={<ArticleList />} />
        </Routes>
      </NuqsAdapter>
    </BrowserRouter>
  </React.StrictMode>
)

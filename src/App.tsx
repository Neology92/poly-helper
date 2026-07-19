import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './components/Home'
import { ToolPage } from './components/ToolPage'
import { ArticlePage } from './components/ArticlePage'
import { NotFound } from './components/NotFound'

/** Drzewo tras: narzędzia (/n/:slug) i artykuły Wiedzy (/w/:slug), oba z rejestrów. */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="n/:slug" element={<ToolPage />} />
        <Route path="w/:slug" element={<ArticlePage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

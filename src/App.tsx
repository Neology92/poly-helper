import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './components/Home'
import { ToolPage } from './components/ToolPage'
import { NotFound } from './components/NotFound'

/** Drzewo tras. Trasy narzędzi są jednorodne (/n/:slug) i obsługiwane przez rejestr. */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="n/:slug" element={<ToolPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

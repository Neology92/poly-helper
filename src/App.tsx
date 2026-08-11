import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './components/Home'
import { ToolPage } from './components/ToolPage'
import { ArticlePage } from './components/ArticlePage'
import { About } from './components/About'
import { DataBackup } from './components/DataBackup'
import { NotFound } from './components/NotFound'

/** Drzewo tras: narzędzia (/n/:slug) i artykuły Wiedzy (/w/:slug), oba z rejestrów. */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        {/* Gra karciana nie jest już osobnym narzędziem — jest zakładką w Tabeli granic.
            Stare linki (i zainstalowane PWA) przekierowujemy, żeby nie trafiały na 404. */}
        <Route path="n/gra-karciana" element={<Navigate to="/n/tabela-granic" replace />} />
        <Route path="n/:slug" element={<ToolPage />} />
        <Route path="w/:slug" element={<ArticlePage />} />
        <Route path="dane" element={<DataBackup />} />
        <Route path="o-projekcie" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

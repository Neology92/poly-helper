import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './components/Home'
import { ToolPage } from './components/ToolPage'
import { ArticlePage } from './components/ArticlePage'
import { NotFound } from './components/NotFound'

// Ukryty prototyp „Żywej umowy" (#8) — NIE w rejestrze narzędzi, dostępny tylko przez URL
// /proto/umowa. Leniwie ładowany (osobny chunk), niewidoczny na stronie głównej.
const UmowaProto = lazy(() => import('./prototypes/umowa/index'))

/** Drzewo tras: narzędzia (/n/:slug) i artykuły Wiedzy (/w/:slug), oba z rejestrów. */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="n/:slug" element={<ToolPage />} />
        <Route path="w/:slug" element={<ArticlePage />} />
        <Route
          path="proto/umowa"
          element={
            <Suspense fallback={<p style={{ padding: 40 }}>Ładowanie…</p>}>
              <UmowaProto />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

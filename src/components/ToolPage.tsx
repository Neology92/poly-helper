import { Suspense } from 'react'
import { Link, useParams } from 'react-router-dom'
import { findTool } from '../tools/registry'
import { NotFound } from './NotFound'
import './tool-page.css'

/** Ekran pojedynczego narzędzia — rozwiązuje slug z URL-a i renderuje jego komponent. */
export function ToolPage() {
  const { slug } = useParams<{ slug: string }>()
  const tool = findTool(slug)

  if (!tool) return <NotFound />

  const { Component } = tool

  return (
    <div className="tool-page">
      <Link to="/" className="back-link">
        <span aria-hidden="true">←</span> Wszystkie narzędzia
      </Link>
      <Suspense fallback={<p className="tool-page__loading">Ładowanie…</p>}>
        <Component />
      </Suspense>
    </div>
  )
}

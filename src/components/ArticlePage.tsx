import { Suspense } from 'react'
import { Link, useParams } from 'react-router-dom'
import { findArticle } from '../knowledge/registry'
import { NotFound } from './NotFound'
import './article-page.css'

/** Ekran pojedynczego artykułu (Wiedza) — rozwiązuje slug z URL-a (/w/:slug). */
export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const article = findArticle(slug)

  if (!article) return <NotFound />

  const { Component } = article

  return (
    <div className="article-page">
      <Link to="/" className="back-link">
        <span aria-hidden="true">←</span> Strona główna
      </Link>
      <Suspense fallback={<p className="article-page__loading">Ładowanie…</p>}>
        <Component />
      </Suspense>
    </div>
  )
}

import type { TDocumentDefinitions } from 'pdfmake/interfaces'

/**
 * Leniwe ładowanie pdfmake + fontu Roboto (pełne polskie znaki). ~2 MB, pobierane dopiero
 * przy pierwszym eksporcie PDF. Wspólne dla wszystkich narzędzi generujących PDF.
 */
export interface PdfMake {
  createPdf: (def: TDocumentDefinitions) => { download: (name?: string) => void }
}

let cached: PdfMake | null = null

export async function getPdfMake(): Promise<PdfMake> {
  if (cached) return cached
  const [pdfMakeMod, vfsMod] = await Promise.all([
    import('pdfmake/build/pdfmake'),
    import('pdfmake/build/vfs_fonts'),
  ])
  const pdfMake = (pdfMakeMod as { default?: unknown }).default ?? pdfMakeMod
  const vfs = (vfsMod as { default?: unknown }).default ?? vfsMod
  ;(pdfMake as { vfs: unknown }).vfs = vfs
  cached = pdfMake as PdfMake
  return cached
}

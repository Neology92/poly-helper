// Moduły buildów pdfmake nie mają własnych typów — deklarujemy je jako 'any',
// bo docDefinition typujemy przez 'pdfmake/interfaces'.
declare module 'pdfmake/build/pdfmake' {
  const pdfMake: unknown
  export default pdfMake
}
declare module 'pdfmake/build/vfs_fonts' {
  const vfs: unknown
  export default vfs
}

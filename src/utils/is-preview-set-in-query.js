export default function isPreviewSetInQuery (query) {
  return 'preview' in query && query.preview !== 'false' && query.preview !== ''
}

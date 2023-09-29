export default function getFullDate(date: string): string {
  return (
    String(new Date(date).getDate()).padStart(2, '0') +
    '/' +
    String(new Date(date).getMonth() + 1).padStart(2, '0') +
    '/' +
    String(new Date(date).getFullYear()).padStart(2, '0')
  )
}

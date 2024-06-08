export const formatDate = (value: string) => {
  const date = new Date(value)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // Months are zero-based
  const year = date.getFullYear()
  
  return `${year}-${month}-${day}`
}
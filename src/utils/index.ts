export const getCartsStorage = (): string[] => {
  return JSON.parse(localStorage.getItem('cart') || '[]')
}

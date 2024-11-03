export const generateSelectedAmount = (amount) => {
  return Array.from({ length: amount }, (_, index) => {
    const amount = index + 1
    return (
      <option key={amount} value={amount}>
        {amount}
      </option>
    )
  })
}

// Function to format price to Indonesian Rupiah
export const priceFormat = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(price)
}

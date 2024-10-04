import customAPI from '../api'
import { useState, useEffect } from 'react'
import CartProduct from '../components/CartProduct'

const HomeView = () => {
  const [products, setProducts] = useState([])
  const getProducts = async () => {
    try {
      const { data } = await customAPI.get('/product/?limit=2')
      setProducts(data.data)
    } catch (error) {
      console.error('Error fetching products:', error) // Improved error logging
    }
  }

  useEffect(() => {
    getProducts()
  }, [])
  return (
    <>
      <div className="border-b border-primary pb-5">
        <h2 className="text-2xl font-bold capitalize">Product List</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mt-5">
        {products.length > 0 ? (
          products.map((item) => <CartProduct key={item._id} item={item} />)
        ) : (
          <p className="text-center">No products available</p>
        )}
      </div>
    </>
  )
}

export default HomeView

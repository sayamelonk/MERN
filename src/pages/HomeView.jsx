import CartProduct from '../components/CartProduct'
import customAPI from '../api'
import { useLoaderData } from 'react-router-dom'

export const loader = async ({ request }) => {
  const { data } = await customAPI.get('/product')
  // console.log(data); // Tambahkan log untuk memeriksa data yang diterima
  const products = data.data
  return products
}

const HomeView = () => {
  const products = useLoaderData() // Ambil data langsung
  // console.log(products); // Tambahkan log untuk memeriksa nilai products
  const productList = Array.isArray(products) ? products : [] // Pastikan products adalah array

  return (
    <>
      <div className="border-b border-primary pb-5">
        <h2 className="text-2xl font-bold capitalize">Product List</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mt-5">
        {productList.length > 0 ? (
          productList.map((item) => <CartProduct key={item._id} item={item} />)
        ) : (
          <p className="text-center">No products available</p>
        )}
      </div>
    </>
  )
}

export default HomeView

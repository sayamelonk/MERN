import customAPI from '../api'
import { useLoaderData } from 'react-router-dom'
import Filter from '../components/Filter'
import CartProduct from '../components/CartProduct'

export const loader = async () => {
  const { data } = await customAPI.get('/product')
  // console.log(data);
  // console.log(request);

  const products = data.data
  return products
}

const ProductView = () => {
  const products = useLoaderData()
  console.log(products)
  return (
    <>
      <Filter />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 mt-5">
        {products.length > 0 ? (
          products.map((item) => <CartProduct key={item._id} item={item} />)
        ) : (
          <p className="text-center">No products available</p>
        )}
      </div>
    </>
  )
}

export default ProductView

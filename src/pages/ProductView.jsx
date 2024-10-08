import customAPI from '../api'
import { useLoaderData } from 'react-router-dom'
import Filter from '../components/Filter'
import CartProduct from '../components/CartProduct'

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ])
  const { data } = await customAPI.get('/product', { params: params })
  // console.log(request);
  // console.log(params)

  const products = data.data
  return { products, params }
}

const ProductView = () => {
  const products = useLoaderData()
  console.log(products)
  return (
    <>
      <Filter />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 mt-5">
        {products.products.length > 0 ? (
          products.products.map((item) => (
            <CartProduct key={item._id} item={item} />
          ))
        ) : (
          <p className="text-center">No products available</p>
        )}
      </div>
    </>
  )
}

export default ProductView

import customAPI from '../api'
import { useLoaderData, Link } from 'react-router-dom'
import Filter from '../components/Filter'
import CartProduct from '../components/CartProduct'
import Pagination from '../components/Pagination'
import { useSelector } from 'react-redux'

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ])
  const { data } = await customAPI.get('/product', { params: params })
  // console.log(request);
  // console.log(params)

  const products = data.data
  const pagination = data.pagination
  return { products, params, pagination }
}

const ProductView = () => {
  const user = useSelector((state) => state.userState.user)
  const { products, pagination } = useLoaderData()
  // console.log(products)
  return (
    <>
      <Filter />
      {user && user.role === 'owner' && (
        <div className="flex justify-end mt-5">
          <Link to={'/product/create'} className="btn btn-primary btn-outline">
            Tambah Product
          </Link>
        </div>
      )}

      <h3 className="text-lg text-primary font-bold text-right my-3">
        Total {pagination.totalProduct} Product
      </h3>
      <div className="grid grid-cols-1md:grid-cols-3 lg:grid-cols-4 gap-12 mt-5">
        {products?.length > 0 ? (
          products.map((item) => (
            <CartProduct key={item._id} item={item} user={user} />
          ))
        ) : (
          <p className="text-center">No products available</p>
        )}
      </div>
      <div className="mt-5 flex justify-center">
        <Pagination />
      </div>
    </>
  )
}

export default ProductView

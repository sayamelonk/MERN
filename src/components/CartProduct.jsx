import PropTypes from 'prop-types' // Import PropTypes
import { Link } from 'react-router-dom'
import { priceFormat } from '../utils'
import { FaTrash, FaPencilAlt } from 'react-icons/fa'
import customAPI from '../api'
import { toast } from 'react-toastify'
import { useRevalidator } from 'react-router-dom'

const CartProduct = ({ item, user }) => {
  const { revalidate } = useRevalidator()
  // Check if item is valid
  if (!item) {
    return <div className="text-red-500">Item not found</div> // Error handling for missing item
  }

  return (
    <div className="card bg-base-300 w-30 shadow-xl mb-6">
      <figure>
        <img
          src={item.image}
          alt={item.name || 'Product Image'} // Fallback alt text for accessibility
          className="h-48 w-full object-cover"
        />
        {item.stock < 1 && (
          <span className="absolute top-2 right-2 inline-block px-2 text-white rounded-md bg-secondary">
            Sold Out
          </span>
        )}
      </figure>
      <div className="card-body">
        {user && user.role === 'owner' && (
          <div className="flex justify-end gap-x-3">
            <FaTrash
              className="text-red-500 cursor-pointer"
              onClick={async () => {
                // console.log('delete')
                const confirmDelete = window.confirm(
                  'Apakah Anda yakin ingin menghapus product ini?',
                )
                if (confirmDelete) {
                  await customAPI.delete(`/product/${item._id}`)
                  toast.info('Product Berhasil Dihapus')
                  revalidate()
                }
              }}
            />
            <Link to={`/product/${item._id}/edit`}>
              <FaPencilAlt className="text-info cursor-pointer" />
            </Link>
          </div>
        )}
        <h2 className="card-title text-primary">{item.name}</h2>
        <p className="font-bold text-accent">{priceFormat(item.price)}</p>
        <p>
          {item.description
            ? item.description.substring(0, 50) + '...'
            : 'No description available'}
        </p>{' '}
        {/* Fallback for description */}
        {item.stock > 0 ? (
          <div className="card-actions justify-end">
            <Link to={`/product/${item._id}`} className="btn btn-primary">
              Buy Now
            </Link>
          </div>
        ) : (
          <div className="card-actions justify-end">
            <Link to={`/product/${item._id}`} className="btn btn-primary">
              See Details
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

// PropTypes validation
CartProduct.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string,
  }).isRequired,
}

export default CartProduct

CartProduct.propTypes = {
  // ... existing prop types ...
  user: PropTypes.shape({
    role: PropTypes.string,
  }),
}

CartProduct.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired, // Add this line
    description: PropTypes.string,
  }).isRequired,
}

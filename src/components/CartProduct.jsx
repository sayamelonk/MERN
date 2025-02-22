import PropTypes from 'prop-types' // Import PropTypes
import { Link } from 'react-router-dom'
import { priceFormat } from '../utils'
import { FaTrash, FaPencilAlt } from 'react-icons/fa'

const CartProduct = ({ item, user }) => {
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
      </figure>
      <div className="card-body">
        {user && user.role === 'owner' && (
          <div className="flex justify-end gap-x-3">
            <FaTrash className="text-red-500 cursor-pointer" />
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
        <div className="card-actions justify-end">
          <Link to={`/product/${item._id}`} className="btn btn-primary">
            Buy Now
          </Link>
        </div>
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

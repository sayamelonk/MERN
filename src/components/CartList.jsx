import { useSelector } from 'react-redux'
import CartListItem from './CartListItem'

const CartList = () => {
  const carts = useSelector((state) => state.cartState.CartItems)
  return (
    <>
      {carts.map((item) => {
        return <CartListItem key={item.cartId} cartItem={item} />
      })}
    </>
  )
}

export default CartList

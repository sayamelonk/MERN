import CartTotal from '../components/CartTotal'
import { Form } from 'react-router-dom'
import FormInput from '../components/form/FormInput'
import { useSelector } from 'react-redux'

const CheckoutView = () => {
  const user = useSelector((state) => state.userState.user)
  const carts = useSelector((state) => state.cartState.CartItems)

  console.log(user, carts)
  return (
    <>
      <div className="border-b border-primary pb-5 mt-5">
        <h2 className="text-2xl font-bold capitalize">Checkout Product</h2>
        <div className="mt-8 grid gap-y-8 gap-x-2 lg:grid-cols-12">
          {/* Form */}
          <div className="lg:col-span-8">
            <Form
              method="post"
              className="bg-base-300 rounded-2xl grid grid-y-5 p-5 items-center"
            >
              <div className="grid grid-cols-2 gap-x-4">
                <FormInput type="name" name="firstName" label="first name" />
                <FormInput type="name" name="lastName" label="last name" />
              </div>
              <FormInput
                type="email"
                name="email"
                label="email"
                defaultValue={user.email}
              />
              <FormInput type="phone" name="number" label="phone" />
              <button type="submit" className="btn btn-primary mt-8">
                Bayar
              </button>
            </Form>
          </div>
          {/* Cart */}
          <div className="lg:col-span-4">
            <CartTotal />
          </div>
        </div>
      </div>
    </>
  )
}

export default CheckoutView

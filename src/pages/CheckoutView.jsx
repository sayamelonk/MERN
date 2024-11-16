import CartTotal from '../components/CartTotal'
import FormInput from '../components/form/FormInput'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import customAPI from '../api'
import { toast } from 'react-toastify'
import { clearCartItem } from '../features/cartSlice'
import { redirect, useNavigate } from 'react-router-dom'

const insertSnapScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js'
    script.setAttribute(
      'data-client-key',
      import.meta.env.VITE_MIDTRANS_CLIENT_KEY,
    )
    script.onload = () => resolve(true)

    document.body.appendChild(script)
  })
}

export const loader = (storage) => () => {
  const user = storage.getState().userState.user
  if (!user) {
    toast.warn('Anda Harus Login Terlebih Dahulu')
    return redirect('/login')
  }
  return null
}

const CheckoutView = () => {
  const user = useSelector((state) => state.userState.user)
  const carts = useSelector((state) => state.cartState.CartItems)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    insertSnapScript()
  }, [])

  const handleCheckout = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)

    const data = Object.fromEntries(formData)
    // console.log(data)

    const newArrayKeranjang = carts.map((item) => {
      return {
        product: item.productId,
        quantity: item.amount,
      }
    })

    try {
      // console.log(newArrayKeranjang)
      const response = await customAPI.post('/order', {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.number,
        cartItem: newArrayKeranjang,
      })

      const snapToken = response.data.token

      window.snap.pay(snapToken.token, {
        // Optional
        onSuccess: function (result) {
          console.log(result)
          dispatch(clearCartItem())
          navigate('/orders')
        },
        // Optional
        onPending: function (result) {
          console.log(result)
          alert('Payment Pending !')
        },
        // Optional
        onError: function (result) {
          console.log(result)
          alert('Payment Error !')
        },
      })
      toast.success('Berhasil Melakukan Pembayaran')
    } catch (error) {
      const errorMessage = error?.response?.data?.message
      toast.error(errorMessage)
    }
  }

  // console.log(user, carts)
  return (
    <>
      <div className="border-b border-primary pb-5 mt-5">
        <h2 className="text-2xl font-bold capitalize">Checkout Product</h2>
        <div className="mt-8 grid gap-y-8 gap-x-2 lg:grid-cols-12">
          {/* Form */}
          <div className="lg:col-span-8">
            <form
              className="bg-base-300 rounded-2xl grid grid-y-5 p-5 items-center"
              onSubmit={handleCheckout}
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
            </form>
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

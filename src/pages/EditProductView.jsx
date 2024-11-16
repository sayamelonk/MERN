import { useState, useEffect } from 'react'
import { useParams, useNavigate, redirect } from 'react-router-dom'
import customAPI from '../api'
import Loading from '../components/Loading'
import FormInput from '../components/form/FormInput'
import FormTextArea from '../components/form/FormTextArea'
import FormSelect from '../components/form/FormSelect'
import { toast } from 'react-toastify'

export const loader = (store) => async () => {
  const user = store.getState().userState.user
  if (!user) {
    toast.warn('Anda Harus Login Terlebih Dahulu')
    return redirect('/login')
  } else if (user.role !== 'owner') {
    toast.warn('Anda Bukan Owner')
    return redirect('/')
  }
  return null
}

const EditProductView = () => {
  const categories = ['Bunga Meja', 'Hand Bouquet', 'Bunga Papan']
  const [product, setProduct] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()

  const getProductId = async () => {
    const { data } = await customAPI.get(`/product/${id}`)
    setProduct(data.data)
    // console.log(data.data)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    event.preventDefault()
    const dataForm = new FormData(event.target)

    const data = Object.fromEntries(dataForm)
    // console.log(data)
    try {
      // create product
      await customAPI.put(`/product/${id}`, {
        // image: responseFileUpload.data.url,
        // ...data,
        name: data.name,
        price: data.price,
        stock: data.stock,
        description: data.description,
        category: data.category,
      })
      toast.info('Product Berhasil Diubah')
      navigate('/products')
    } catch (error) {
      const errorMessage = error.response.data.message
      toast.error(errorMessage)
    }
  }

  useEffect(() => {
    getProductId()
  }, [])

  return (
    <>
      {product ? (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <FormSelect
            label="Pilih Category"
            name="category"
            list={categories}
            defaultValue={product.category}
          />
          <FormInput
            label="Nama Product"
            name="name"
            type="text"
            defaultValue={product.name}
          />
          <FormInput
            label="Harga Product"
            name="price"
            type="number"
            defaultValue={product.price}
          />
          <FormInput
            label="Stock Product"
            name="stock"
            type="number"
            defaultValue={product.stock}
          />
          <FormTextArea
            label="Description Product"
            name="description"
            defaultValue={product.description}
          />
          <input
            type="submit"
            value="Edit"
            className="btn btn-primary btn-block mt-5 btn-md"
          />
        </form>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default EditProductView

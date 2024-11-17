import { useState, useEffect } from 'react'
import FormInput from '../components/form/FormInput'
import FormSelect from '../components/form/FormSelect'
import FormTextArea from '../components/form/FormTextArea'
import customAPI from '../api'
import { toast } from 'react-toastify'
import { useNavigate, useParams, redirect } from 'react-router-dom'

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
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const categories = ['Bunga Meja', 'Hand Bouquet', 'Bunga Papan']
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch existing product data
    const fetchProduct = async () => {
      try {
        console.log('Product ID:', id) // Periksa apakah ID produk sudah diterima
        const response = await customAPI.get(`/product/${id}`)
        console.log('Product Data:', response.data.data) // Periksa data produk yang diterima
        setProduct(response.data.data)
      } catch (error) {
        const errorMessage = error.response.data.message
        toast.error(errorMessage)
      }
    }
    fetchProduct()
  }, [id])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const dataForm = new FormData(event.target)
    const data = Object.fromEntries(dataForm)

    try {
      let imageUrl = product.image // Default to the existing image URL

      // Check if a new image was uploaded
      if (data.image.size > 0) {
        const responseFileUpload = await customAPI.post(
          '/product/file-upload',
          { image: data.image },
          { headers: { 'Content-Type': 'multipart/form-data' } },
        )
        imageUrl = responseFileUpload.data.url
      }

      // Update product
      await customAPI.put(`/product/${id}`, {
        image: imageUrl,
        name: data.name,
        price: data.price,
        stock: data.stock,
        description: data.description,
        category: data.category,
      })

      toast.success('Product Berhasil Diedit')
      navigate('/products')
    } catch (error) {
      const errorMessage = error.response.data.message
      toast.error(errorMessage)
    }
  }

  if (!product) return <p>Loading...</p>

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <label className="form-control">
        <label className="label"></label>
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="w-64 h-64 object-cover mx-auto mb-4 border rounded-lg shadow-lg"
          />
        )}
        <input
          type="file"
          name="image"
          className="file-input file-input-bordered file-input-primary w-full"
        />
      </label>
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
  )
}

export default EditProductView

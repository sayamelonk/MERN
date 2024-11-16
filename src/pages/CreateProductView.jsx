import FormInput from '../components/form/FormInput'
import FormSelect from '../components/form/FormSelect'
import FormTextArea from '../components/form/FormTextArea'
import customAPI from '../api'
import { toast } from 'react-toastify'
import { useNavigate, redirect } from 'react-router-dom'

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

const CreateProductView = () => {
  const categories = ['Bunga Meja', 'Hand Bouquet', 'Bunga Papan']
  const navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault()
    const dataForm = new FormData(event.target)

    const data = Object.fromEntries(dataForm)
    // console.log(data)
    try {
      // upload image file
      const responseFileUpload = await customAPI.post(
        '/product/file-upload',
        {
          image: data.image,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      console.log('Response Image', responseFileUpload.data.url)

      // create product
      await customAPI.post('/product', {
        image: responseFileUpload.data.url,
        // ...data,
        name: data.name,
        price: data.price,
        stock: data.stock,
        description: data.description,
        category: data.category,
      })
      toast.success('Product Berhasil Ditambahkan')
      navigate('/products')
    } catch (error) {
      const errorMessage = error.response.data.message
      toast.error(errorMessage)
    }
  }
  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <label className="form-control">
        <label className="label">
          <span className="label-text capitalize">Image</span>
        </label>
        <input
          type="file"
          name="image"
          className="file-input file-input-bordered file-input-primary w-full"
        />
      </label>
      <FormSelect label="Pilih Category" name="category" list={categories} />
      <FormInput label="Nama Product" name="name" type="text" />
      <FormInput label="Harga Product" name="price" type="number" />
      <FormInput label="Stock Product" name="stock" type="number" />
      <FormTextArea label="Description Product" name="description" />
      <input
        type="submit"
        value="Tambah"
        className="btn btn-primary btn-block mt-5 btn-md"
      />
    </form>
  )
}

export default CreateProductView

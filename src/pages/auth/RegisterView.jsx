import FormAuth from '../../components/FormAuth'
import customAPI from '../../api'
import { toast } from 'react-toastify'
import { redirect } from 'react-router-dom'
import { registerUser } from '../../features/userSlice'

// eslint-disable-next-line react-refresh/only-export-components
export const action = (store) => async ({ request }) => {
  // console.log(store)
  // console.log(request)

  const formInputData = await request.formData();
  const data = Object.fromEntries(formInputData);
  // console.log(data)
  try {
    const response = await customAPI.post('/auth/register', data)
    store.dispatch(registerUser(response.data))
    toast.success('Register Berhasil')
    return redirect('/')
  } catch (error) {
    const errorMessage = error?.response?.data?.message
    toast.error(errorMessage)
    return null
    
  }
}

const RegisterView = () => {
  return (
    <main>
      <FormAuth isRegister={true} />
    </main>
  )
}

export default RegisterView

import FormAuth from '../../components/FormAuth'
import customAPI from '../../api'
import { toast } from 'react-toastify'
import { redirect } from 'react-router-dom'
import { loginUser } from '../../features/userSlice'

// eslint-disable-next-line react-refresh/only-export-components
export const action = (store) => async ({ request }) => {
  const fromInputData = await request.formData()
  const data = Object.fromEntries(fromInputData)

  try {
    const response = await customAPI.post('/auth/login', data)
    // console.log(response)
    store.dispatch(loginUser(response.data))
    toast.success('Login Berhasil')
    return redirect('/')
  } catch (error) {
    const errorMessage = error?.response?.data?.message
    // console.log(errorMessage)
    toast.error(errorMessage)
    return null
  }
}

const LoginView = () => {
  return (
    <main>
      <FormAuth />
    </main>
  )
}

export default LoginView

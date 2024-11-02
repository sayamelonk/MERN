import FormAuth from '../../components/FormAuth'
import customAPI from '../../api'

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ request }) => {
  const fromInputData = await request.formData()
  const data = Object.fromEntries(fromInputData)

  try {
    const response = await customAPI.post('/auth/login', data)
    console.log(response)
    return null
  } catch (error) {
    const errorMessage = error?.response?.data?.message
    console.log(errorMessage)
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

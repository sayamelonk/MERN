import axios from 'axios'

try {
  const data = await axios.get('/api/v1/product')
  console.log(data)
  console.log('Data yang diterima:', data);
} catch (error) {
  console.log(error)
}

const HomeView = () => {
  return <div>HomeView</div>
}

export default HomeView

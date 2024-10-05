import { useParams } from 'react-router-dom'

const DetailProduct = () => {
  let { id } = useParams()
  return <div>id product : {id}</div>
}

export default DetailProduct

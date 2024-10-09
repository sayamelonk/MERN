import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'

const Pagination = () => {
  const { pagination } = useLoaderData()
  const { page, totalPage } = pagination
  const navigate = useNavigate()
  const location = useLocation()

  const handlePageChange = (number) => {
    // console.log(number)
    // console.log(location.search)
    // console.log(location.pathname)

    const searchParams = new URLSearchParams(location.search)
    searchParams.set('page', number)
    navigate(`${location.pathname}?${searchParams.toString()}`)
  }

  const pages = Array.from({ length: totalPage }, (_, index) => {
    return index + 1
  })

  return (
    <div className="join">
      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          className={`join-item btn ${pageNumber === page ? 'btn-active' : ''}`}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  )
}

export default Pagination

import { Link, useRouteError } from 'react-router-dom'

const ErrorView = () => {
  const error = useRouteError()
  if (error.status === 404) {
    return (
      <main className="grid min-h-[100vh] place-items-center px-8">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <p className="mt-6 text-lg leading-7 ">
            Maaf halaman tidak ditemukan
          </p>
          <div className="mt-10">
            <Link to={'/'} className="btn btn-primary">
              Kembali ke Home
            </Link>
          </div>
        </div>
      </main>
    )
  } else if (error.status === 500) {
    return (
      <main className="grid min-h-[100vh] place-items-center px-8">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-primary">505</h1>
          <p className="mt-6 text-lg leading-7 ">
            Maaf server bermasalah silahkan kembali nanti
          </p>
        </div>
      </main>
    )
  }
}

export default ErrorView

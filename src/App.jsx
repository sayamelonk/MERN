import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// component
import AboutView from './pages/AboutView'
import HomeView from './pages/HomeView'
import CartView from './pages/CartView'
import OrderView from './pages/OrderView'
import ProductView from './pages/ProductView'
import LoginView from './pages/auth/LoginView'
import RegisterView from './pages/auth/RegisterView'
import PublicLayout from './layouts/PublicLayout'
import DetailProduct from './pages/DetailProduct'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomeView /> },
      { path: 'products', element: <ProductView /> },
      { path: 'product/:id', element: <DetailProduct /> },
      { path: 'orders', element: <OrderView /> },
      { path: 'carts', element: <CartView /> },
      { path: 'about', element: <AboutView /> },
    ],
  },
  {
    path: '/login',
    element: <LoginView />,
  },
  {
    path: '/register',
    element: <RegisterView />,
  },
  {
    path: 'products',
    element: <ProductView />,
  },
  {
    path: 'product/:id',
    element: <DetailProduct />,
  },
  {
    path: 'orders',
    element: <OrderView />,
  },
  {
    path: 'cart',
    element: <CartView />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App

import './App.css'
import Layout from './app/layout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Index from './pages/Vouchers/Index'
import Create from './pages/Vouchers/Create'
import Edit from './pages/Vouchers/Edit'
import VoucherTracks from './pages/VoucherTracking/VoucherTracks'
import SignIn from './pages/SignIn'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import ErrorBoundaryPage from './pages/ErrorBoundaryPage'


function App() {
 
  const router = createBrowserRouter([
    {
      path: "/", element: <ProtectedRoute><Layout /></ProtectedRoute>, errorElement: <ErrorBoundaryPage />, children: [
        {
          path: "/", index: true, element: <Dashboard />
        }, {
          path: "vouchers", element: <Index />
        },
        {
          path: "vouchers/create", element: <Create />
        },
        {
          path: "vouchers/edit/:id", element: <Edit />
        },
        {
          path: "voucher-tracking", element: <VoucherTracks />
        }
      ]
    },
    {
      path: "/admin", index: true, element: <SignIn />
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App

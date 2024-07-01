import './App.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

function App() {
  const dispatch = useDispatch()

  //Axios interceptors configuration
  const { token } = useSelector((state) => state.auth)
  axios.defaults.baseURL = import.meta.env.VITE_API_URL
  axios.interceptors.request.use(
    async (config) => {
      if (!config.headers.Authorization) {
        const userToken = localStorage.getItem('AUTH_TICKETS_TOKEN')
        if (userToken) {
          config.headers.Authorization = `Bearer ${userToken}`
        }
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  axios.interceptors.response.use(
    function (response) {
      return response
    },
    function axiosRetryInterceptor(err) {
      if (
        err.response.status === 401 ||
        err.response.data.message === '401 Unauthorized'
      ) {
        dispatch(logout())
        return Promise.reject(err)
      }
      return Promise.reject(err)
    }
  )

  //Routes configuration
  // const routes = createBrowserRouter([
  //   {
  //     path: '/',
  //     element: token ? <Navigate to="/dashboard" /> : <Login />,
  //   },
  // ])

  return (
    <>
      {/* <RouterProvider router={routes} /> */}
      <h1>Hola mundo</h1>
    </>
  )
}

export default App

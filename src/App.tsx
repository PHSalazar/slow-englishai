import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import ErrorPage from './pages/ErrorPage'
import FullScreenLesson from './pages/FullScreenLesson'
import Home from './pages/Home'
import Lessons from './pages/Lessons'
import Profile from './pages/Profile'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'lessons',
        element: < Lessons />
      },
      {
        path: '/lesson/:id',
        element: <FullScreenLesson />
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: '*',
        element: <ErrorPage />
      }
    ],
    errorElement: <ErrorPage />
  }
],
  {
    basename: '/slow-englishai/'
  })

const App = () => {
  return (
    <RouterProvider router={routes} />
  )
}

export default App
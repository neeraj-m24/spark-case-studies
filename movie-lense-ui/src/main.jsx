import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Movies from './components/Movies.jsx'
import Home from './components/Home.jsx'
import Genres from './components/Genres.jsx'
// import Demographics from './components/Demographics.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Demographics from './components/Demographics.jsx'

const router = createBrowserRouter([
  {
    path:'',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Home/>
      }
      ,
      {
        path:"/movies",
        element:<Movies/>
      },
      {
        path:"/genres",
        element:<Genres/>
      },
      // {
      //   path:"/demographics",
      //   element: <Demographics/>
      // },
      {
        path:"/demographics",
        element:<Demographics/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router}/>
  </StrictMode>,
)

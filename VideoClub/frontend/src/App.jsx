import { RouterProvider } from "react-router-dom"
import { router } from "./router"

const App = () => {
  return (
    // aqui podriamos poner cualquier contexto que necesite
    <RouterProvider router={router} />
  )
}

export default App
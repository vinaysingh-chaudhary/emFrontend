import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"

const App = () => {
  return (
    <div className="relative max-w-screen-xl w-full mx-auto flex justify-center items-center">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default App

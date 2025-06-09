import { Outlet } from "react-router"
import Sidbar from "../components/Sidbar"
import Footer from "../components/Footer"

const MainLayout = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidbar />
      <div className="flex flex-col flex-1 h-full overflow-auto bg-white">
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default MainLayout

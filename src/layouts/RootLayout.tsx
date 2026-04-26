import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

const RootLayout = () => {

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <div className="p-4 flex-1 overflow-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default RootLayout
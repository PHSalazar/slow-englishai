import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

const RootLayout = () => {

    return (
        <div className="flex flex-col-reverse sm:flex-row h-svh overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col min-h-0">
                <Navbar />
                <div className="p-8 flex-1 overflow-y-auto">
                    <Outlet />
                    <div className="h-20 w-full">&nbsp;</div>
                </div>
            </div>

        </div>
    )
}

export default RootLayout
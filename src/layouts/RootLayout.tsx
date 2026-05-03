import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import useUserInfoStore from "../store/useUserInfoStore";

const RootLayout = () => {
    const { username } = useUserInfoStore();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (username === "Usuário") {
            navigate('/profile/setup-wizard');
        }
    }, [username, location.pathname])

    return (

        <div className="flex flex-col-reverse sm:flex-row h-svh overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col min-h-0">
                <Navbar />
                <div className="flex-1 min-h-0">
                    <Outlet />
                    <div className="h-20 w-full">&nbsp;</div>
                </div>
            </div>

        </div>
    )
}

export default RootLayout
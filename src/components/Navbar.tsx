import { IoIosNotificationsOutline } from "react-icons/io"
import { IoSettingsOutline } from "react-icons/io5"
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between py-2 px-4 h-[64px] bg-white border-b border-[#F1F5F9]">
            <h1 className="font-bold">Slow EnglishAi</h1>
            <div className='flex flex-nowrap gap-2'>
                <IoIosNotificationsOutline className="cursor-pointer" size={20} />
                <Link to="/profile/setup-wizard" title="Configurações de Conta">
                    <IoSettingsOutline className="cursor-pointer" size={20} />
                </Link>
                {/* <RxAvatar className="cursor-pointer" size={20} /> */}
            </div>
        </nav>
    )
}

export default Navbar
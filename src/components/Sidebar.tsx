import { FaRegUserCircle } from "react-icons/fa"
import { MdOutlineDashboard } from "react-icons/md"
import { RiGraduationCapLine } from "react-icons/ri"
import { NavLink } from "react-router-dom"

const Sidebar = () => {
    const baseStyle = `p-3 rounded-md`;
    const activeClass = ({ isActive }) => `${baseStyle} ${isActive ? `bg-[#DBEAFE] text-[#1E40AF]` : ``}`;


    return (
        <aside className={`flex flex-col gap-5 bg-white border-r border-[#F1F5F9] w-[200px] h-screen p-3`}>

            <div className="mt-5 pb-2 border-b border-[#F1F5F9]">
                <h2>Username</h2>
                <p className="text-xs">Lorem, ipsum dolor.</p>
            </div>
            <ul className="flex flex-col flex-1 gap-2">
                <NavLink to="/" className={activeClass}>
                    <li className="flex flex-nowrap items-center gap-2 text-sm hover:text-[#1E40AF]"><MdOutlineDashboard />Home</li>
                </NavLink>
                <NavLink to="lessons" className={activeClass}>
                    <li className="flex flex-nowrap items-center gap-2 text-sm hover:text-[#1E40AF]"><RiGraduationCapLine />Lessons</li>
                </NavLink>
                <NavLink to="profile" className={activeClass}>
                    <li className="flex flex-nowrap items-center gap-2 text-sm hover:text-[#1E40AF]"><FaRegUserCircle />Meu Perfil</li>
                </NavLink>
            </ul>


            <NavLink to="/start">Start Lesson</NavLink>
        </aside>
    )
}

export default Sidebar
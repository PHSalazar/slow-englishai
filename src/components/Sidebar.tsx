import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { RiGraduationCapLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import useUserInfoStore from "../store/useUserInfoStore";


const menuIcons = [
    { to: '/', label: "Home", icon: MdOutlineDashboard },
    { to: 'lessons', label: "Lessons", icon: RiGraduationCapLine },
    { to: 'profile', label: "My Profile", icon: FaRegUserCircle },
];

const Sidebar = () => {
    const { username, language } = useUserInfoStore();
    const baseStyle = `p-3 rounded-md`;
    const activeClass = ({ isActive }: { isActive: boolean }) => `${baseStyle} ${isActive ? `bg-[#DBEAFE] text-[#1E40AF]` : ``}`;

    const classIcon = "text-xl sm:text-base";


    return (
        <aside className={`flex flex-row sm:flex-col gap-5 bg-white border-r border-[#F1F5F9] w-full sm:w-[200px] h-auto sm:h-screen p-3`}>

            <div className="hidden sm:block mt-5 pb-2 border-b border-[#F1F5F9]">
                <h2>{username}</h2>
                <p className="text-xs">Aprendendo <b>{language}</b>.</p>
            </div>
            <ul className="flex flex-row sm:flex-col flex-1 justify-around sm:justify-start gap-2">
                {
                    menuIcons.map((menuItem) => (
                        <NavLink to={menuItem.to} className={activeClass}>
                            <li className="flex flex-col sm:flex-row flex-nowrap items-center gap-2 text-xs sm:text-sm hover:text-[#1E40AF]"><menuItem.icon className={classIcon} /> {menuItem.label}</li>
                        </NavLink>
                    ))
                }
            </ul>


            <NavLink to="/start" className="hidden sm:block">Start Lesson</NavLink>
        </aside>
    )
}

export default Sidebar
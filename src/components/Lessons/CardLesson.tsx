import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface CardLessonProps {
    id: number;
    title: string;
    description: string,
    completed: boolean,
    percentage: number,
    started?: boolean
}
const CardLesson = ({ id, title, description, percentage, started }: CardLessonProps) => {
    return (
        <div className="w-full sm:w-[200px] flex flex-col gap-0">
            <span className="bg-[#DBEAFE] text-[#1E40AF] px-2 text-xs rounded-tr-2xl w-fit border-l border-l-[#1E40AF]">{title}</span>
            <div className="flex flex-col bg-white shadow border-transparent border-l border-l-[#1E40AF] p-2 text-xs">
                <p>
                    {description}
                </p>
                <p className="pt-1 text-gray-500 text-[11px]">
                    {!started ? <span className="italic!">Não iniciado</span> : `${percentage}% estudado`}
                </p>
                <Link to={`/lesson/${id}`} className="self-end mt-5 flex gap-2 items-center text-[#1E40AF]">
                    Continue <FaArrowRightLong />
                </Link>
            </div>
        </div>
    )
}

export default CardLesson
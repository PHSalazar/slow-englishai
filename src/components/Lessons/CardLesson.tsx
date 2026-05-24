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
                <p className="mt-2 text-gray-500 text-[11px] border rounded-full text-center">
                    <div
                        className="h-1 bg-blue-600 transition-all duration-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                    />
                </p>
                <p className="scale-z-95 text-center">{!started ? <span className="italic!">Não iniciado</span> : `${percentage}% estudado`}</p>
                <Link to={`/lesson/${id}`} className="self-end mt-5 flex gap-2 items-center text-[#1E40AF]">
                    {percentage === 100 ? "Revisar" : "Continuar"}
                    <FaArrowRightLong />
                </Link>
            </div>
        </div>
    )
}

export default CardLesson
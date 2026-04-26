import { RiGraduationCapLine } from "react-icons/ri"
import { Link } from "react-router-dom"
import CardLesson from "../components/Lessons/CardLesson"
import useLessonStore from "../store/useLessonStore"

const Lessons = () => {
    const allLessons = useLessonStore((state) => state.allLessons);
    const activeLesson = useLessonStore((state) => state.activeLesson);

    const currentLesson = allLessons.find(lesson => lesson.id === activeLesson?.data?.id);
    const titleCurrentLesson = currentLesson?.title;


    return (
        <div className="h-full flex flex-col gap-5">

            {titleCurrentLesson && (
                <div className="flex flex-col">
                    <Link to={`/lesson/${currentLesson?.id}`} className="bg-[#DBEAFE] text-[#1E40AF] rounded-md px-4 py-2 w-fit hover:bg-[#1E40AF] hover:text-[#DBEAFE] transition-colors">Continuar '{titleCurrentLesson}'...</Link>
                </div>
            )}

            <div >
                <h2 className="flex flex-nowrap items-center gap-2 mb-2"><RiGraduationCapLine /> All lessons</h2>

                <div className="flex flex-wrap gap-5">
                    {
                        allLessons.map(lesson => (
                            <CardLesson key={lesson.id} {...lesson} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Lessons
import { useParams } from "react-router-dom";
import useUserInfoStore, { type LessonFlow } from "../../store/useUserInfoStore";

const LessonDialogue = () => {
    const { id } = useParams();
    const { allLessons } = useUserInfoStore();
    const currentLesson = allLessons.find(lesson => lesson.id === Number(id));

    const dialogueLesson = currentLesson?.lesson_flow?.find((item: any) => item.type === "dialogue") as Extract<LessonFlow, { "type": "dialogue" }> | undefined;



    return (
        <div className="flex flex-col gap-2 h-full">
            {dialogueLesson?.messages.map(message => (
                <div className="text-sm">
                    <p><b>{message.role}</b>: {message.text}</p>
                </div>
            ))}
        </div >
    )
}

export default LessonDialogue
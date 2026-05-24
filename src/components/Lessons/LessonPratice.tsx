import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { useParams } from "react-router-dom";
import useUserInfoStore, { type LessonFlow } from "../../store/useUserInfoStore";

// interface LessonPageProps {
//     lesson_flow: LessonFlow[];
//     handleStageLesson: () => void;
// }

const LessonPratice = () => {
    const { id } = useParams();
    const { allLessons } = useUserInfoStore();
    const currentLesson = allLessons.find(lesson => lesson.id === Number(id));

    const praticeLesson = currentLesson?.lesson_flow?.find((item: any) => item.type === "practice") as Extract<LessonFlow, { "type": "practice" }> | undefined;

    const parts = praticeLesson?.question.split(/_{2,}/) ?? [];
    const answer = praticeLesson?.answer;

    const [value, setValue] = useState('');
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const [isDisabled, setIsDisabled] = useState(false);

    const styleAnswerBase = "w-fit rounded-full p-2 mx-5 text-sm border";
    const styleAnswer = `${styleAnswerBase} ${isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`;

    const verifyAnswer = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            setIsDisabled(true);
            if (value.trim().toLowerCase() === answer?.trim().toLowerCase()) {
                setIsCorrect(true)
            } else {
                setIsCorrect(false)
            }

        }
    }

    return (
        <div className="flex flex-col gap-2 h-full">
            <p>Chegou a hora de praticar sobre o que vimos em <b>{currentLesson?.title}</b></p>
            <p>Aperte <b>ENTER</b> para confirmar sua resposta.</p>

            <div className="mt-5">
                {parts[0]}
                <input disabled={isDisabled} onKeyDown={e => verifyAnswer(e)} className="w-20 border border-gray-500 border-dotted pl-1 outline-blue-300" type="text" onChange={(e) => setValue(e.target.value)} />
                {parts[1]}
            </div>

            {
                isCorrect !== null && (
                    <div className="flex flex-col items-center justify-center gap-5">
                        <div className={styleAnswer}>
                            {isCorrect !== null && isCorrect === true
                                ? <p className="flex items-center gap-2"><FaCheck /> Parabéns! Você acertou essa.</p>
                                : <p className="flex items-center gap-2"><MdError /> Sua resposta está errada!</p>
                            }
                        </div>
                    </div>
                )
            }
        </div >
    )
}

export default LessonPratice
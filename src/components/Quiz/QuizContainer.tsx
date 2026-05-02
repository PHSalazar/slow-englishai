import { useEffect, useState } from "react";
import { GrFormNext } from "react-icons/gr";
import useUserInfoStore from "../../store/useUserInfoStore";
import QuizCard from "./QuizCard";

interface QuizQuestion {
    question: string,
    options: string[],
    answer: number,
}

const QuizContainer = () => {
    const { allLessons } = useUserInfoStore();
    const [question, setQuestion] = useState<QuizQuestion | null>(null);

    // Todas os quizes
    const filtedQuizzes = allLessons.filter(lesson => lesson.quiz && lesson.quiz.length > 0)
        .flatMap(lesson => lesson.quiz as QuizQuestion[])


    const handleGenerateQuestion = () => {
        if (filtedQuizzes.length > 0) {
            const randomQuiz = Math.floor(Math.random() * filtedQuizzes.length);
            setQuestion(filtedQuizzes[randomQuiz]);
        }
    }

    useEffect(() => {
        handleGenerateQuestion();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-full">
            {question ? (
                <>

                    <QuizCard key={question.question} {...question} handleCorrect={handleGenerateQuestion} />

                    <button className="mt-10 flex flex-nowrap items-center gap-1 text-xs cursor-pointer transition-all hover:animate-pulse hover:" onClick={handleGenerateQuestion}>
                        <span>Pular</span>
                        <GrFormNext />
                    </button>
                </>
            ) : (
                <div className="text-gray-500 text-xs font-normal">Nenhum quiz gerado...</div>
            )
            }

        </div>
    )
}

export default QuizContainer
import puter from "@heyputer/puter.js";
import { AiFillSound } from "react-icons/ai";

interface QuizProps {
    question: string;
    options: string[];
    answer: number;
    handleCorrect: () => void;
}

const QuizCard = ({ question, options, answer, handleCorrect }: QuizProps) => {

    const baseAnswer = "bg-gray-100 p-2 border border-gray-300 rounded-xl text-sm hover:border-[#1E40AF] hover:text-[#1E40AF] cursor-pointer hover:animate-pulse transition-all";

    const checkAnswer = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.currentTarget;

        if (answer === index) {
            target.classList.add("bg-green-100", "text-green-700");
        } else {
            target.classList.add("bg-red-100", "text-red-700", "border-red-300");
        }

        setTimeout(() => {
            handleCorrect();
        }, 1000);
    };

    const listenQuestion = (question: string) => {
        puter.ai.txt2speech(question)
    }

    return (
        <div className="flex flex-col gap-5">
            <h1 className="flex items-center gap-2">{question} <AiFillSound className="cursor-pointer hover:text-[#1E40AF]" onClick={() => listenQuestion(question)} /></h1>

            <div className="flex gap-2 items-center justify-center">
                {
                    options.map((option, index) => (
                        <button key={index} onClick={(e) => checkAnswer(index, e)} className={baseAnswer}>{option}</button>
                    ))
                }
            </div>
        </div>
    )
}

export default QuizCard
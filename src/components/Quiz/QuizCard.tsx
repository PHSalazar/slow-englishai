import { AiFillSound } from "react-icons/ai";

interface QuizProps {
    question: string;
    options: string[];
    answer: number;
    handleCorrect: () => void;
}


const QuizCard = ({ question, options, answer, handleCorrect }: QuizProps) => {

    const handlePlayQuestion = async () => {
        try {
            const response = await fetch("http://localhost:8000/tts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    text: question
                })
            });

            const data = await response.json();

            const audioSrc = `data:audio/mp3;base64,${data.audio_base64}`;

            const audio = new Audio(audioSrc);
            audio.play();

            if (!response.ok) {
                throw new Error(`Erro na API: ${response.status}`);
            }



        } catch (error) {
            console.error("Erro ao chamar API de TTS:", error)
        }
    }

    const baseAnswer =
        "bg-gray-100 p-2 border border-gray-300 rounded-xl text-sm hover:border-[#1E40AF] hover:text-[#1E40AF] cursor-pointer hover:animate-pulse transition-all";


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


    return (
        <div className="flex flex-col gap-5">
            <h1 className="flex items-center gap-2">
                {question}
                <AiFillSound
                    className="cursor-pointer hover:text-[#1E40AF]"
                    onClick={handlePlayQuestion}
                />
            </h1>

            <div className="flex flex-wrap gap-2 items-center justify-center">
                {options.map((option, index) => (
                    <button
                        key={index}
                        onClick={(e) => checkAnswer(index, e)}
                        className={baseAnswer}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuizCard;
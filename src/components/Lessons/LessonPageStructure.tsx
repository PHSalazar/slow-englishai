import { MdOutlineTipsAndUpdates } from "react-icons/md";
import type { LessonFlow } from "../../store/useUserInfoStore";

interface LessonPageProps {
    lesson_flow: LessonFlow[];
}

const LessonPageStructure = ({ lesson_flow }: LessonPageProps) => {

    const explanation = lesson_flow?.find((item: any) => item.type === "explanation") as Extract<LessonFlow, { "type": "explanation" }> | undefined

    const examples = lesson_flow?.find((item: any) => item.type === "examples") as Extract<LessonFlow, { "type": "examples" }> | undefined

    const tips = lesson_flow?.find((item: any) => item.type === "tip") as Extract<LessonFlow, { "type": "tip" }> | undefined


    return (
        <div className="flex flex-col gap-4 overflow-y-auto">
            <div>
                <h1>Explicação</h1>
                {explanation?.paragraphs?.map((explanation: string, index: number) => (
                    <p key={index} className="text-sm indent-8">
                        {explanation}
                    </p>
                ))}
            </div>

            <div>
                <h1>Exemplos de Uso</h1>
                {examples?.items?.map((example: string, index: number) => (
                    <p key={index} className="text-sm">
                        {example}
                    </p>
                ))}
            </div>

            <div>
                <h1 className="flex flex-nowrap gap-2 items-center"><MdOutlineTipsAndUpdates /> Dica</h1>
                {tips && <p>{tips?.content}</p>}
            </div>

        </div>
    )
}

export default LessonPageStructure
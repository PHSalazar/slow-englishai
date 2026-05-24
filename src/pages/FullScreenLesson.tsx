import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { CiChat2 } from 'react-icons/ci';
import { FaBookOpen } from 'react-icons/fa';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { LuPenLine } from 'react-icons/lu';
import { MdQuiz } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import LessonDialogue from '../components/Lessons/LessonDialogue';
import LessonTexts from '../components/Lessons/LessonPageStructure';
import LessonPratice from '../components/Lessons/LessonPratice';
import WellDone from '../components/Lessons/WellDone';
import QuizContainer from '../components/Quiz/QuizContainer';
import useUserInfoStore from '../store/useUserInfoStore';

const stageConfig = {
    lesson: { icon: <CiChat2 />, text: "Exemplos de Diálogo" },
    dialogue: { icon: <LuPenLine />, text: 'Praticar' },
    practice: { icon: <MdQuiz />, text: 'Quiz' },
    quiz: { icon: <FaBookOpen />, text: 'Concluir' },
    finished: { icon: <FaBookOpen />, text: 'Concluir' },
} as const;

const FullScreenLesson = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const { allLessons, updateActiveLessonData, apiKey, setLastAccessedLesson, addTask } = useUserInfoStore();

    const currentLesson = allLessons.find(lesson => lesson.id === Number(id));
    const titleCurrentLesson = currentLesson ? currentLesson.title : null;
    const descriptionCurrentLesson = currentLesson ? currentLesson.description : null;

    const [isLoading, setIsLoading] = useState(false);

    const [stageLesson, setStageLesson] = useState<'lesson' | 'dialogue' | 'practice' | 'quiz' | 'finished'>('lesson');

    const hasRun = useRef(false);

    const configStage = stageConfig[stageLesson];

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        setLastAccessedLesson(Number(id));
        addTask({ icon: "FaBookOpenReader", label: `Você começou a estudar '${titleCurrentLesson}.'`, date: new Date() })
    }, [id])

    const handleStageLesson = () => {
        setStageLesson(prev => {
            if (prev === 'lesson') return 'dialogue';
            if (prev === 'dialogue') return 'practice';
            if (prev === 'practice') return 'quiz';
            return 'finished';
        });
    }

    const handleGetContentLesson = async () => {
        setIsLoading(true);

        try {
            const textPrompt = `You are an English teacher creating Duolingo-style vocabulary lessons for a Brazilian student.

        Module: "${titleCurrentLesson}"
        Topic: "${descriptionCurrentLesson}"

        CORE PRINCIPLES:
        - Practical, conversational, real-life English only
        - No academic grammar explanations
        - Short blocks, natural spoken English
        - Beginner/intermediate friendly

        ---

        LESSON STRUCTURE:

        1. explanation — 3 paragraphs (rules below)
        2. examples — 3 to 5 real-life sentences
        3. tip — common Brazilian mistake OR pronunciation tip
        4. practice — one short exercise with answer
        5. dialogue — mini realistic conversation
        6. quiz — 5 multiple choice questions

        ---

        EXPLANATION RULES (STRICT):

        Write EXACTLY 3 paragraphs. Each paragraph has EXACTLY 2 sentences. Total: 6 sentences.

        Paragraph 1 (3 sentences):
        - Sentence 1: explain the meaning clearly, include Portuguese in parentheses
        - Sentence 2: give the real-life context (school, work, travel, daily life)
        - Sentence 3: expand on why this is useful or when Brazilians struggle with it

        Paragraph 2 (4 sentences):
        - Sentence 1: show a full example sentence in quotes
        - Sentence 2: explain when to use it in a real situation
        - Sentence 3: show a second example sentence in quotes (different context)
        - Sentence 4: contrast or reinforce with a tip about usage

        Paragraph 3 (2 sentences):
        - Sentence 1: show a third example sentence in quotes
        - Sentence 2: explain when to use it in a real situation

        FORMAT:
        - Separate each paragraph with ONE blank line
        - No labels like "Paragraph 1"
        - No intro phrases like "Hey there!" or "Today we will learn..."
        - Write like a real teacher speaking naturally
        - MUST have EXACTLY 3 paragraphs — never 2, never 4

        EXAMPLE (follow this exact structure and length):
        We use "this" and "that" to point to things around us (este/esse/aquele). "This" is for things close to you, and "that" is for things farther away. Brazilian students often mix them up because Portuguese uses context more freely than English does.

        You can say "Can I try this shirt?" when you're holding it in a store, or "I want that one on the shelf" when pointing to something across the room. The distance between you and the object is what decides which word to use. Think of "this" as things you can touch right now, and "that" as things you'd have to walk toward.

        "These shoes are really comfortable" works when you're wearing them or holding them. Use "those" when the shoes are somewhere else — like "those red ones over there look nice."

        FORMAT:
        - No labels like "Paragraph 1"
        - No intro phrases like "Hey there!" or "Today we will learn..."
        - Write like a real teacher speaking naturally

        ---

        WORDS (8–12 items):
        - Everyday spoken English, Duolingo style
        - Prefer phrases over isolated words (e.g. "what time is it?", "I'm late")
        - explain: 1 sentence, usage context only — no grammar rules
        - uses: 1 natural example sentence

        QUIZ (5 questions):
        - Focus: translation, vocabulary, sentence structure
        - NOT based on any story — must be standalone
        - Beginner-friendly, 4 options each
        - answer = correct option index (0–3)

        ---

        Return ONLY valid JSON:

        {
            "lesson_flow": [
        {"type": "explanation", "paragraphs": ["paragraph 1 here", "paragraph 2 here", "paragraph 3 here"] }
        {"type": "examples", "items": ["...", "..."] },
        {"type": "tip", "content": ["...", "...", "..."] },
        {"type": "practice", "question": "...", "answer": "..." },
        {
            "type": "dialogue",
        "messages": [
        {"role": "teacher", "text": "..." },
        {"role": "student", "text": "..." }
        ]
                }
        ],
        "words": [
        {
            "la": "word or everyday phrase",
        "pt-br": "tradução direta e natural",
        "explain": "quando usar em 1 frase simples",
        "uses": "simple natural example sentence"
                }
        ],
        "quiz": [
        {
            "question": "question in English",
        "question_pt": "pergunta em português",
        "options": ["A", "B", "C", "D"],
        "answer": 0
                }
        ]
            }`;

            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
                { contents: [{ parts: [{ text: textPrompt }] }], generationConfig: { responseMimeType: "application/json" } }
            );

            const generatedData = JSON.parse(response.data.candidates[0].content.parts[0].text);
            if (!generatedData.words) throw new Error("IA não gerou palavras.");

            updateActiveLessonData(Number(id), {
                words: generatedData.words,
                quiz: generatedData.quiz,
                lesson_flow: generatedData.lesson_flow
            });
            console.log(generatedData)

        } catch (e: any) {
            console.error("Erro detalhado:", e);
            alert(`Falha: ${e.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className=' h-full flex flex-col overflow-hidden p-5'>
            <div className='flex flex-nowrap items-center gap-2'>
                <IoIosArrowRoundBack size={20} onClick={() => navigate(-1)} className='cursor-pointer' title='Voltar para Lessons' />
                <p>
                    {titleCurrentLesson}
                </p>

            </div>

            {
                isLoading ? (
                    <div className='flex-1 flex flex-col gap-5 items-center justify-center'>
                        <p className='font-thin'>Carregando '<span className='italic! font-medium'>{titleCurrentLesson}</span>'</p>
                        <AiOutlineLoading3Quarters size={24} className='self-center animate-spin' />
                    </div>
                ) : (
                    <>
                        {/* <button onClick={listenAudio} disabled={isLoading}>
                            Ouvir
                        </button> */}

                        <button onClick={handleGetContentLesson} disabled={isLoading}>
                            Gerar Lição
                        </button>
                    </>
                )
            }


            <>
                {currentLesson?.lesson_flow && currentLesson?.lesson_flow?.length > 0 && stageLesson === "lesson" && (
                    <>
                        <LessonTexts
                            lesson_flow={currentLesson.lesson_flow}
                        />

                    </>
                )}

                {currentLesson?.lesson_flow && currentLesson?.lesson_flow?.length > 0 && stageLesson === "dialogue" && (
                    <>
                        <LessonDialogue />

                    </>
                )}

                {currentLesson?.lesson_flow && currentLesson?.lesson_flow?.length > 0 && stageLesson === "practice" && (
                    <>
                        <LessonPratice />

                    </>
                )}

                {currentLesson?.lesson_flow && currentLesson?.lesson_flow?.length > 0 && stageLesson === "quiz" && (
                    <>
                        <QuizContainer />

                    </>
                )}

                {currentLesson?.lesson_flow && currentLesson?.lesson_flow?.length > 0 && stageLesson === "finished" && (
                    <>
                        <WellDone />
                    </>
                )}

                <div className="flex justify-center w-full">
                    <button
                        onClick={handleStageLesson}
                        className="flex flex-nowrap gap-2 items-center text-sm border border-transparent text-white bg-blue-600 hover:text-blue-600  hover:border-blue-600 hover:bg-white p-2 rounded-2xl transition-colors cursor-pointer">
                        {configStage.icon} {configStage.text}
                    </button>
                </div>
            </>


            {/* {
                words && words.map(word => (
                    <Card className='w-11/12 m-h-[200px] self-center text-center'>
                        <p className='font-extrabold'>{word.la}</p>
                        <hr />
                        <p className='font-thin'>{word['pt-br']}</p>
                        <p className='mt-2'>{word.explain}</p>
                        <p className='mt-2'>{word.uses}</p>
                    </Card>
                ))
            } */}

            {/* <div className="flex-1 border-t pt-2 min-h-0">
                <Chat />
            </div> */}
        </div >
    )
}

export default FullScreenLesson
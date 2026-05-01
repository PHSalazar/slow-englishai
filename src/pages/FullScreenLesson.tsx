import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaBookOpenReader } from 'react-icons/fa6';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import useUserInfoStore from '../store/useUserInfoStore';

const FullScreenLesson = () => {
    const [history, setHistory] = useState('');

    const { id } = useParams();
    const navigate = useNavigate();
    const allLessons = useUserInfoStore((state) => state.allLessons);

    const currentLesson = allLessons.find(lesson => lesson.id === Number(id));
    const titleCurrentLesson = currentLesson ? currentLesson.title : null;
    const descriptionCurrentLesson = currentLesson ? currentLesson.description : null;

    const { apiKey, setLastAccessedLesson, updateActiveLessonData, addTask } = useUserInfoStore();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setLastAccessedLesson(Number(id));
        addTask({ icon: FaBookOpenReader, label: "Você iniciou os estudos!", date: new Date() })
    }, [id])


    /*
        const handleGetContent = async () => {
            setIsLoading(true);
    
            try {
                const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`;
                const body = {
                    contents: [
                        {
                            parts: [
                                {
                                    text: "Speak EXTREMELY slowly and clearly for an English learner.\n\nI wake up every day at 7:00 AM."
                                }
                            ]
                        }
                    ], generationConfig: {
                        responseModalities: [
                            "AUDIO"
                        ], speechConfig: {
                            voiceConfig: {
                                prebuiltVoiceConfig: {
                                    voiceName: "Aoede"
                                }
                            }
                        }
                    }, model: "gemini-2.5-flash-preview-tts"
                };
    
                const response = await axios.post(url, body);
    
                // 1. Extrai o base64 da resposta
                const base64Audio = response.data.candidates[0].content.parts[0].inlineData.data;
    
                // 2. Decodifica o base64 para array de bytes
                const binaryString = window.atob(base64Audio);
                const bytes = new Uint8Array(binaryString.length);
                for (let i = 0; i < binaryString.length; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                }
    
                // 3. Converte para o formato Int16 (padrão do Gemini)
                const pcm16 = new Int16Array(bytes.buffer);
    
                // 4. Configura o AudioContext ignorando erro do TS no webkit
                const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
                const audioBuffer = audioCtx.createBuffer(1, pcm16.length, 24000);
                const channelData = audioBuffer.getChannelData(0);
    
                // 5. Normaliza os dados para Float32 (-1.0 a 1.0) para o navegador
                for (let i = 0; i < pcm16.length; i++) {
                    channelData[i] = pcm16[i] / 32768.0;
                }
    
                // 6. Conecta e toca o áudio
                const source = audioCtx.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(audioCtx.destination);
                source.start();
    
            } catch (e: any) {
                console.error("Erro detalhado:", e);
                alert(`Falha: ${e.message}`);
            } finally {
                setIsLoading(false);
            }
        };
    */
    const handleGetContentText = async () => {
        setIsLoading(true);

        try {
            const textPrompt = `You are an expert English teacher creating an English lesson for a Brazilian student.
Module: "${titleCurrentLesson}", Topic number: ${descriptionCurrentLesson}.

Your task is to ALWAYS generate a short, engaging story strictly focused on the module and topic provided. The story must teach vocabulary naturally and remain simple, realistic, and useful for everyday communication.

STRICT CONTENT RULES:
- The story must stay fully aligned with the module and topic.
- It must focus on practical, real-life situations.
- Vocabulary must match the learning goal (no unrelated themes).
- The tone must be clear and suitable for beginner/intermediate learners.

STRICT AUDIO LENGTH RULES:
- The 'tts_script' MUST be exactly 100 to 130 words long.
- It must be natural spoken English (like a teacher narrating).
- It must match the reading story in meaning exactly.

Return ONLY valid JSON:
{
  "reading_html": "HTML reading material with the short story.",
  "tts_script_pt_html": "Plain text for text-to-speech Portuguese translation.",
  "tts_script": "Plain text for text-to-speech. Must be 100 to 130 words.",
  "quiz": "array with 5 quiz about module and topic. question's format {question: string, options: ["string", "string", "string", "string"], answer: number}"
}`;

            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
                { contents: [{ parts: [{ text: textPrompt }] }], generationConfig: { responseMimeType: "application/json" } }
            );

            const generatedData = JSON.parse(response.data.candidates[0].content.parts[0].text);
            if (!generatedData.tts_script) throw new Error("IA não gerou script.");

            setHistory(generatedData.reading_html);
            updateActiveLessonData(Number(id), generatedData);

            const lessonPayload = {
                reading_html: generatedData.reading_html,
            };

            // Atualiza a Store
            useUserInfoStore.getState().updateActiveLessonData(Number(id), lessonPayload);

            setHistory(generatedData.reading_html);

        } catch (e: any) {
            console.error("Erro detalhado:", e);
            alert(`Falha: ${e.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className=' h-full flex flex-col'>
            <div className='flex flex-nowrap items-center gap-2'>
                <IoIosArrowRoundBack size={20} onClick={() => navigate(-1)} className='cursor-pointer' title='Voltar para Lessons' />
                <p>
                    {titleCurrentLesson}
                </p>

            </div>

            {
                isLoading ? (
                    <div className='flex-1 flex flex-col gap-5 items-center justify-center '>
                        <p className='font-thin'>Carregando '<span className='italic! font-medium'>{titleCurrentLesson}</span>'</p>
                        <AiOutlineLoading3Quarters size={24} className='self-center animate-spin' />
                    </div>
                ) : (
                    <>
                        <button onClick={handleGetContentText} disabled={isLoading}>
                            Gerar áudio
                        </button>
                    </>
                )
            }


            <div className='w-11/12 self-center' dangerouslySetInnerHTML={{ __html: history || currentLesson?.reading_html || '' }} />
        </div>
    )
}

export default FullScreenLesson
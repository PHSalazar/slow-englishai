import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import Chat from '../components/Chat';
import useUserInfoStore from '../store/useUserInfoStore';

interface Word {
    la: string;
    "pt-br": string;
    explain: string;
    uses: string;
}

const FullScreenLesson = () => {
    const [history, setHistory] = useState('');

    const { id } = useParams();
    const navigate = useNavigate();
    const { allLessons, addWordsToLesson, apiKey, setLastAccessedLesson, updateActiveLessonData, addTask, addQuiz } = useUserInfoStore();

    const currentLesson = allLessons.find(lesson => lesson.id === Number(id));
    const titleCurrentLesson = currentLesson ? currentLesson.title : null;
    const descriptionCurrentLesson = currentLesson ? currentLesson.description : null;
    const words = currentLesson ? currentLesson.words : [];

    const [isLoading, setIsLoading] = useState(false);

    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        setLastAccessedLesson(Number(id));
        addTask({ icon: "FaBookOpenReader", label: `Você começou a estudar '${titleCurrentLesson}.'`, date: new Date() })
    }, [id])


    const listenAudio = () => {
        fetch("https://www.freevoicereader.com/api/free-tts", {
            "headers": {
                "accept": "*/*",
                "accept-language": "pt-BR,pt;q=0.6",
                "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryRp7SACZGe2JSxCTT",
                "priority": "u=1, i",
                "sec-ch-ua": "\"Brave\";v=\"147\", \"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"147\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Linux\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "sec-gpc": "1",
                "cookie": "__client_uat=0; __client_uat_TM3UfgYz=0",
                "Referer": "https://www.freevoicereader.com/"
            },
            "body": "------WebKitFormBoundaryRp7SACZGe2JSxCTT\r\nContent-Disposition: form-data; name=\"text\"\r\n\r\nNow, let's make these sentences negative. It's very simple! Just add \"not\" after the \"to be\" verb.\r\nRule: [Pronoun] + [am/is/are] + not + [rest of sentence].\r\nContrast: \"I am happy.\" (Eu estou feliz.) becomes \"I am not happy.\" (Eu não estou feliz.)\r\n\"He is Brazilian.\" (Ele é brasileiro.) becomes \"He is not Brazilian.\" (Ele não é brasileiro.)\r\n\"They are at home.\" (Eles estão em casa.) becomes \"They are not at home.\" (Eles não estão em casa.)\r\n------WebKitFormBoundaryRp7SACZGe2JSxCTT\r\nContent-Disposition: form-data; name=\"voice\"\r\n\r\nen-US-JennyNeural\r\n------WebKitFormBoundaryRp7SACZGe2JSxCTT\r\nContent-Disposition: form-data; name=\"title\"\r\n\r\nNow_lets_make\r\n------WebKitFormBoundaryRp7SACZGe2JSxCTT--\r\n",
            "method": "POST"
        });
    }

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
1) TEACHING TEXT
- Write a short DIDACTIC text (not just a story).
- Clearly teach the topic with examples.
- Teach the topic step-by-step (not just explanation).
- Include:
  • a simple rule explanation
  • clear contrast (e.g. do vs does)
  • 3–5 practical examples
  • short guided practice (questions or prompts inside the text)
- May include a simple story, but focus on learning.
- It must focus on practical, real-life situations.
- Vocabulary must match the learning goal (no unrelated themes).
- The tone must be clear and suitable for beginner/intermediate learners.

STRICT AUDIO LENGTH RULES:
- The 'tts_script' MUST be exactly 100 to 130 words long.
- It must be natural spoken English (like a teacher narrating).
- It must match the reading story in meaning exactly.

3) QUIZ (STRICT)
- Based ONLY on module/topic.
- MUST NOT use or reference the text/story.
- Must be answerable WITHOUT reading the text.
- Focus: vocabulary, grammar, sentence structure, translation (EN↔PT).
FORBIDDEN:
- Questions about story details (objects, colors, events, characters).

Return ONLY valid JSON:
{
  "reading_html": "HTML reading material with the short story without titles ou subtitles. Max 3 paragraphs. Separe paragraphs with <br\/><br\/>",
  "tts_script_pt_html": "Plain text for text-to-speech Portuguese translation.",
  "tts_script": "Plain text for text-to-speech. Must be 100 to 130 words.",
  "quiz": "array with 5 questions about module and topic focused phrases in portugues translation, word's translation. question's format {question: string, question_pt: 'question portuguese translation', options: ["string", "string", "string", "string"], answer: number}"
}`;

            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
                { contents: [{ parts: [{ text: textPrompt }] }], generationConfig: { responseMimeType: "application/json" } }
            );

            const generatedData = JSON.parse(response.data.candidates[0].content.parts[0].text);
            if (!generatedData.tts_script) throw new Error("IA não gerou script.");

            setHistory(generatedData.reading_html);
            updateActiveLessonData(Number(id), generatedData);
            addQuiz(generatedData.quiz);

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

    const handleGetContentLesson = async () => {
        setIsLoading(true);

        try {
            const textPrompt = `You are an English teacher creating Duolingo-style vocabulary for a Brazilian student.

Module: "${titleCurrentLesson}"  
Topic: "${descriptionCurrentLesson}"

Return ONLY valid JSON:

{
  "words": [
    {
      "la": "word or everyday phrase",
      "pt-br": "tradução direta e natural",
      "explain": "quando usar em 1 frase simples (sem regras gramaticais, sem explicações longas)",
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
}

Rules:
- words: 8-12 items
- MUST be everyday spoken English (Duolingo style)
- prefer phrases over grammar rules (e.g. "what time is it?", "I'm late", "see you later")
- NO grammar explanations
- NO rules (like 'AM/PM means...', 'on + days...')
- explain MUST be:
  • 1 short sentence
  • only usage context (not theory)
- focus on real conversation
- quiz: 5 questions
- quiz must be independent of any text
- output ONLY JSON`;

            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
                { contents: [{ parts: [{ text: textPrompt }] }], generationConfig: { responseMimeType: "application/json" } }
            );

            const generatedData = JSON.parse(response.data.candidates[0].content.parts[0].text);
            if (!generatedData.words) throw new Error("IA não gerou palavras.");

            // setHistory(generatedData.reading_html);
            // updateActiveLessonData(Number(id), generatedData);
            addQuiz(generatedData.quiz);

            addWordsToLesson(Number(id), generatedData.words);

            // const lessonPayload = {
            //     reading_html: generatedData.reading_html,
            // };

            // Atualiza a Store
            // useUserInfoStore.getState().updateActiveLessonData(Number(id), lessonPayload);

            // setHistory(generatedData.reading_html);

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
                    <div className='flex-1 flex flex-col gap-5 items-center justify-center '>
                        <p className='font-thin'>Carregando '<span className='italic! font-medium'>{titleCurrentLesson}</span>'</p>
                        <AiOutlineLoading3Quarters size={24} className='self-center animate-spin' />
                    </div>
                ) : (
                    <>
                        <button onClick={listenAudio} disabled={isLoading}>
                            Ouvir
                        </button>

                        <button onClick={handleGetContentLesson} disabled={isLoading}>
                            Gerar Lição
                        </button>
                    </>
                )
            }


            {/* <div className='w-11/12 self-center' dangerouslySetInnerHTML={{ __html: history || currentLesson?.reading_html || '' }} /> */}

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

            <div className="flex-1 border-t pt-2 min-h-0">
                <Chat />
            </div>
        </div >
    )
}

export default FullScreenLesson
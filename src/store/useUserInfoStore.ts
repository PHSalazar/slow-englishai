import type { IconType } from "react-icons";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// --- Interfaces ---
interface Lesson {
    id: number;
    title: string;
    description: string;
    reading_html?: string;
    transcript_html?: string;
    transcript_pt_html?: string;
    tts_script?: string;
    completed: boolean;
    percentage: number;
    started?: boolean;
}

interface Task {
    icon?: IconType;
    label: string,
    date: Date;
}

interface QuizQuestion {
    question: string,
    options: string[],
    answer: number,
}

interface AppState {
    // User Info
    username: string;
    apiKey: string;
    language: string;
    history: Task[];
    quiz: QuizQuestion[];

    // Lessons
    allLessons: Lesson[];
    lastAccessedLesson?: number | null;

    // Actions: User
    setUsername: (username: string) => void;
    setApiKey: (apiKey: string) => void;
    setLanguage: (language: string) => void;
    resetUser: () => void;

    // Actions: Lessons
    setLessons: (newLessons: Lesson[]) => void;
    setLastAccessedLesson: (id: number) => void;

    updateActiveLessonData: (id: number, data: Partial<Lesson>) => void;

    // Actions: Tasks
    addTask: (task: Task) => void;

    // Actions: Quiz
    addQuiz: (quiz: QuizQuestion) => void;
}

const initialLessons: Lesson[] = [
    {
        "id": 1,
        "title": "Lesson 1: Greetings and Introductions",
        "description": "Aprenda a cumprimentar pessoas, se apresentar e usar expressões básicas de cortesia no dia a dia.",
        completed: false,
        percentage: 0,
    },
    {
        "id": 2,
        "title": "Lesson 2: Essential Verbs and Pronouns",
        "description": "Foco no verbo 'to be' e pronomes pessoais para construir frases afirmativas e negativas simples.",
        completed: false,
        percentage: 0
    },
    {
        "id": 3,
        "title": "Lesson 3: Common Vocabulary and Objects",
        "description": "Expansão de vocabulário com nomes de objetos comuns, cores e números para descrever o ambiente.",
        completed: false,
        percentage: 0
    },
    {
        "id": 4,
        "title": "Lesson 4: Present Simple Tense",
        "description": "Como falar sobre rotinas, hábitos e fatos usando verbos de ação no presente.",
        completed: false,
        percentage: 0
    },
    {
        "id": 5,
        "title": "Lesson 5: Asking Questions",
        "description": "Uso de 'Do/Does' e pronomes interrogativos (Who, What, Where, When, Why) para formular perguntas.",
        completed: false,
        percentage: 0
    },
    {
        "id": 6,
        "title": "Lesson 6: Telling Time and Schedules",
        "description": "Aprenda a ler as horas, falar sobre dias da semana e organizar compromissos em inglês.",
        completed: false,
        percentage: 0
    },
    {
        "id": 7,
        "title": "Lesson 7: Daily Conversations",
        "description": "Prática de diálogos situacionais, como pedir comida em um restaurante ou pedir informações.",
        completed: false,
        percentage: 0
    }
];

const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            username: 'Usuário',
            apiKey: 'Sem API configurada',
            language: 'english',
            allLessons: initialLessons,
            lastAccessedLesson: null,
            started: false,
            history: [],
            quiz: [],

            setUsername: (username) => set({ username }),
            setApiKey: (apiKey) => set({ apiKey }),
            setLanguage: (language) => set({ language }),
            resetUser: () => set({
                username: 'Sem nome',
                apiKey: 'Sem API configurada',
                language: 'English'
            }),

            setLessons: (newLessons) => set({ allLessons: newLessons }),

            setLastAccessedLesson: (id: number) => {
                set((state) => ({
                    lastAccessedLesson: id,
                    allLessons: state.allLessons.map((lesson) => lesson.id === id ?
                        { ...lesson, started: true } : lesson
                    )
                }));
            },


            updateActiveLessonData: (id: number, data) => {
                set((state) => {
                    return {
                        allLessons: state.allLessons.map((lesson) =>
                            lesson.id === id
                                ? { ...lesson, ...data }
                                : lesson
                        ),
                    };
                });
            },

            addTask: (task: Task) => {
                set((state) => ({
                    history: [...state.history, task]
                }))
            },

            addQuiz: (quiz: QuizQuestion) => {
                set((state) => ({
                    quiz: [...state.quiz, quiz]
                }))
            }

        }),
        {
            name: 'slow-englishai-phsalazar',
        }
    )
);

export default useAppStore;
import { create } from "zustand";
import { persist } from "zustand/middleware";

// --- Interfaces ---
interface Lesson {
    id: number;
    title: string;
    description: string;
    words: Word[];

    lesson_flow: LessonFlow[];
    reading_html?: string;
    transcript_html?: string;
    transcript_pt_html?: string;
    tts_script?: string;
    completed: boolean;
    percentage: number;
    started?: boolean;
    quiz?: QuizQuestion[];


}

interface Task {
    icon?: string;
    label: string,
    date: Date;
}

interface QuizQuestion {
    question: string,
    options: string[],
    answer: number,
}

interface Word {
    la: string;
    "pt-br": string;
    explain: string;
    uses: string;
}

export type LessonFlow =
    | {
        type: "explanation";
        paragraphs: string[];
    }
    | {
        type: "examples";
        items: string[];
    }
    | {
        type: "tip";
        content: string;
    }
    | {
        type: "practice";
        question: string;
        answer: string;
    }
    | {
        type: "dialogue";
        messages: {
            role: "teacher" | "student";
            text: string;
        }[];
    };

interface AppState {
    // User Info
    username: string;
    apiKey: string;
    language: string;
    history: Task[];

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
    // addQuiz: (quiz: QuizQuestion) => void;

    // Actions: Words
    addWordsToLesson: (lessonId: number, words: Word[]) => void;

    // Porcentagem
    setPercentage: (id: number, percentage: number) => void;
}

const initialLessons: Lesson[] = [
    {
        "id": 1,
        "title": "Lesson 1: Greetings and Introductions",
        "description": "Aprenda a cumprimentar pessoas, se apresentar e usar expressões básicas de cortesia no dia a dia.",
        completed: false,
        percentage: 0,
        words: [],
        lesson_flow: [] as LessonFlow[]
    },
    {
        "id": 2,
        "title": "Lesson 2: Essential Verbs and Pronouns",
        "description": "Foco no verbo 'to be' e pronomes pessoais para construir frases afirmativas e negativas simples.",
        completed: false,
        percentage: 0,
        words: [],
        lesson_flow: [] as LessonFlow[]
    },
    {
        "id": 3,
        "title": "Lesson 3: Common Vocabulary and Objects",
        "description": "Expansão de vocabulário com nomes de objetos comuns, cores e números para descrever o ambiente.",
        completed: false,
        percentage: 0,
        words: [],
        lesson_flow: [] as LessonFlow[]
    },
    {
        "id": 4,
        "title": "Lesson 4: Present Simple Tense",
        "description": "Como falar sobre rotinas, hábitos e fatos usando verbos de ação no presente.",
        completed: false,
        percentage: 0,
        words: [],
        lesson_flow: [] as LessonFlow[]
    },
    {
        "id": 5,
        "title": "Lesson 5: Asking Questions",
        "description": "Uso de 'Do/Does' e pronomes interrogativos (Who, What, Where, When, Why) para formular perguntas.",
        completed: false,
        percentage: 0,
        words: [],
        lesson_flow: [] as LessonFlow[]
    },
    {
        "id": 6,
        "title": "Lesson 6: Telling Time and Schedules",
        "description": "Aprenda a ler as horas, falar sobre dias da semana e organizar compromissos em inglês.",
        completed: false,
        percentage: 0,
        words: [],
        lesson_flow: [] as LessonFlow[]
    },
    {
        "id": 7,
        "title": "Lesson 7: Daily Conversations",
        "description": "Prática de diálogos situacionais, como pedir comida em um restaurante ou pedir informações.",
        completed: false,
        percentage: 0,
        words: [],
        lesson_flow: [] as LessonFlow[]
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
            words: [],

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
                set((state) => {
                    const taskExists = state.history.some(t => t.label === task.label);

                    if (!taskExists) {
                        return {
                            history: [...state.history, task]
                        }
                    }

                    return state;
                })
            },

            addWordsToLesson: (lessonId: number, words: Word[]) => {
                set((state) => ({
                    allLessons: state.allLessons.map((lesson) =>
                        lesson.id === lessonId
                            ? { ...lesson, words: words }
                            : lesson
                    )
                }));
            },

            // Salvar porcentagem
            setPercentage: (id, percentage) => set((state) => ({
                allLessons: state.allLessons.map((l) => l.id === id && l.percentage < percentage ? { ...l, percentage } : l)
            }))

        }),
        {
            name: 'slow-englishai-phsalazar',
        }
    )
);

export default useAppStore;